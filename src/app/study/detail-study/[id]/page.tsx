'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import RecordDetail from '@/components/RecordDetail';
import { useParams } from 'next/navigation';
import { getStudyFeed } from '@/api/page';
import { joinStudy, submitRecord, getRecordPage } from '@/api/study';
import { useUser } from '@/context/UserContext';

interface StudyDetail {
  id: number;
  title: string;
  description: string;
  creatorName: string;
  startDate: string;
  endDate: string;
  participantsMax: number;
  recruitDeadline: string;
}

interface RecordList {
  id: number;
  authorName: string;
  title: string;
  createdAt: string;
  content?: string;
  comments?: [];
}

export default function StudyDetailPage() {
  const { isLoggedIn } = useUser();
  const { id: studyId } = useParams() as { id: string };

  const [isParticipant, setIsParticipant] = useState(false);
  const [studyDetail, setStudyDetail] = useState<StudyDetail>();
  const [participantNum, setParticipantNum] = useState(0);
  const [recordList, setRecordList] = useState<RecordList[]>();

  // 페이징
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blockSize = 5;
  const pageBlock = Math.floor((currentPage - 1) / blockSize);


  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', content: '' });

  const fetchStudy = async () => {
    if (!studyId) return;
    try {
      const res = await getStudyFeed(studyId);
      setIsParticipant(res.data.isParticipant);
      setStudyDetail(res.data.studyDetail);
      setParticipantNum(res.data.participantNum);
      setRecordList(res.data.recordList);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  const isEnded = studyDetail && new Date() > new Date(studyDetail.endDate);

  const handleJoinStudy = async (e: any) => {
    if (!isLoggedIn) return alert('로그인이 필요합니다.');

    if (window.confirm('스터디에 참여하겠습니까?')) {
      try {
        const res = await joinStudy(studyId);
        alert('스터디 가입 완료');
        location.reload();
      } catch (err) {
        alert('가입 실패했습니다.');
      }
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const fetchRecordPage = async (currentPage: number) => {
    try {
      const res = await getRecordPage(studyId, currentPage);
      console.log("작동?", res.data);
      setRecordList(res.data?.recordList);
      setTotalPages(res.data?.totalPages);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRecordPage(currentPage);
  }, [currentPage])


  // 기록 제출 관련 
  const toggleRecordSubmitForm = () => setShowForm(prev => !prev);
  const handleRecordSubmit = async (e: any) => {
    try {
      const res = await submitRecord(studyId, newRecord);
      location.reload();
    } catch (err) {
      alert('제출 실패');
    }
  }

  // 기록 내용 보기
  const [openRecordId, setOpenRecordId] = useState<number | null>(null);
  const toggleRecordDetail = (id: number) => {
    setOpenRecordId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <section className={styles.studyInfo}>
        <h2>{studyDetail?.title}</h2>
        <p>{studyDetail?.description}</p>
        <ul>
          <li>스터디 기간</li><li>{studyDetail?.startDate.toString().split("T")[0]} ~ {studyDetail?.endDate.toString().split("T")[0]}</li>
          <li>참여인원</li><li>{participantNum} / {studyDetail?.participantsMax}</li>
          <li>방장</li><li>{studyDetail?.creatorName}</li>
        </ul>
      </section>
      <section className={styles.buttonSection}>
        {isParticipant ? (
          <>
            {isEnded ? (
              <div className={styles.finished}>스터디 완료</div>
            ) : (
              <>
                <button className={styles.recordToggleButton} onClick={toggleRecordSubmitForm}>기록 남기기</button>
                {showForm && (
                  <form className={styles.recordForm}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="title" className={styles.label}>제목</label>
                      <input id="title" name="title" className={styles.input} onChange={handleChange} />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="content" className={styles.label}>내용</label>
                      <textarea id="content" name="content" className={styles.textarea} onChange={handleChange} />
                    </div>

                    <div className={styles.buttonWrapper}>
                      <button type="submit" className={styles.submitButton} onClick={handleRecordSubmit}>등록</button>
                    </div>
                  </form>)}
              </>
            )}
          </>
        ) : (
          <button className={styles.joinButton} onClick={handleJoinStudy}>참여하기</button>
        )}
      </section>
      <section>
        <h2>기록 목록</h2>
        <div className={styles.recordList}>
          <ul>
            <li>작성자</li>
            <li>제목</li>
            <li>날짜</li>
          </ul>
          {recordList?.map((r) => (
            <React.Fragment key={r.id}>
              <ul onClick={() => toggleRecordDetail(r.id)}
                className={isParticipant
                  ? styles.recordRowParticipant
                  : styles.recordRow}>
                <li>{r.authorName}</li>
                <li>{r.title}</li>
                <li>{r.createdAt.toString().split("T")[0]}</li>
              </ul>
              {isParticipant && openRecordId === r.id &&
                <RecordDetail
                  recordId={r.id}
                  content={r.content}
                  comments={r.comments} />}
            </React.Fragment>
          ))}
          <div className={styles.pagination}>
            <div>{pageBlock > 0 &&
              <button onClick={() => setCurrentPage((pageBlock - 1) * blockSize + 1)}
                className={styles.blockButton}>
                이전
              </button>
            }
              {Array.from({ length: blockSize }, (_, index) => {
                const firstPage = pageBlock * blockSize + 1;
                const pageNumber = firstPage + index;
                if (pageNumber > totalPages) return null;
                return (
                  <button key={index}
                    className={currentPage === pageNumber ? styles.currentPageButton : styles.pageButton}
                    onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                  </button>)
              })}
              {(pageBlock + 1) * blockSize < totalPages &&
                <button onClick={() => setCurrentPage((pageBlock + 1) * blockSize + 1)}
                  className={styles.blockButton}>
                  다음
                </button>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}