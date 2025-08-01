'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStudyFeed } from '@/api/page';
import { joinStudy, submitRecord, getRecordPage, getComments } from '@/api/study';
import { useUser } from '@/context/UserContext';
import RecordDetail from '@/components/studyfeed/RecordDetail';
import PaginationComponent from "@/components/pagination/Pagination";
import styles from './page.module.css';

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

interface Participants {
  nickname: string;
}

export default function StudyDetailPage() {
  // 사용자 정보, 로그인 상태
  const { isLoggedIn, user } = useUser();
  // URL 파라미터에서 스터디 ID 가져오기
  const { id: studyId } = useParams() as { id: string };

  // API 응답 데이터 상태 관리
  const [isParticipant, setIsParticipant] = useState(false);
  const [studyDetail, setStudyDetail] = useState<StudyDetail>();
  const [participantNum, setParticipantNum] = useState(0);
  const [recordList, setRecordList] = useState<RecordList[]>();
  const [participants, setParticipants] = useState<Participants[]>();

  // 페이지네이션 관련 상태
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blockSize = 5;

  // 기록 작성 폼 관련 상태
  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', content: '' });

  // 열려있는 기록 ID 관리
  const [openRecordId, setOpenRecordId] = useState<number | null>(null);

  // 데이터 불러오기 관련
  // 1. 스터디 정보 + 모든 기록 목록 초기 로딩
  useEffect(() => {
    const fetchStudy = async () => {
      if (!studyId) return;
      try {
        const res = await getStudyFeed(studyId);
        setIsParticipant(res.data.isParticipant);
        setStudyDetail(res.data.studyDetail);
        setParticipantNum(res.data.participantNum);
        setRecordList(res.data.recordList);
        setTotalPages(res.data.totalPages);
        setParticipants(res.data.participantsList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudy();
  }, [studyId]);

  // 2. 특정 페이지 기록 목록만 가져오기 (페이지네이션용)
  useEffect(() => {
    const fetchRecordPage = async (currentPage: number) => {
      try {
        const res = await getRecordPage(studyId, currentPage);
        setRecordList(res.data?.recordList);
        setTotalPages(res.data?.totalPages);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRecordPage(currentPage);
    setOpenRecordId(null);
  }, [studyId, currentPage])

  // 3. 수정된 기록 반영 (제목/내용 수정 후 업데이트)
  const fetchRecord = async (updatedRecord: RecordList) => {
    try {
      setRecordList((prev) =>
        prev?.map((r) =>
          r.id === updatedRecord.id ? {
            ...r,
            title: updatedRecord.title,
            content: updatedRecord.content,
          } : r
        )
      )
    } catch (err) {
      console.error(err);
    }
  }

  // 4. 특정 기록의 댓글만 갱신 (댓글 작성/수정 후)
  const fetchCommentsForRecord = async (recordId: number) => {
    try {
      const res = await getComments(recordId);
      setRecordList((prev) =>
        prev?.map((r) =>
          r.id === recordId ? { ...r, comments: res.data } : r
        )
      );
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
    }
  };


  // 스터디 종료 여부 체크
  const isEnded = studyDetail && new Date() > new Date(studyDetail.endDate);


  // 이벤트 핸들러
  // 1. 스터디 참여 요청
  const handleJoinStudy = async () => {
    if (!isLoggedIn) return alert('로그인이 필요합니다.');
    if (window.confirm('스터디에 참여하겠습니까?')) {
      try {
        await joinStudy(studyId);
        alert('스터디 가입 완료');
        location.reload();
      } catch (err) {
        console.log(err);
        alert('가입 실패했습니다.');
      }
    }
  }

  // 2. 기록 작성 입력 값 변경 핸들러
  const handleRecordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };


  // 3. 기록 제출 요청
  const toggleRecordSubmitForm = () => setShowForm(prev => !prev);
  const handleRecordSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await submitRecord(studyId, newRecord);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
      alert('제출 실패');
    }
  }

  // 4. 특정 기록 펼치기/접기 (상세 보기)
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
          <li>멤버</li><li>{participants?.map((p, i) => (<span className={styles.memberList} key={i}>{p.nickname}</span>))}</li>
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
                      <input id="title" name="title" className={styles.input} onChange={handleRecordChange} />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="content" className={styles.label}>내용</label>
                      <textarea id="content" name="content" className={styles.textarea} onChange={handleRecordChange} />
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
            <div key={r.id}>
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
                  isAuthor={user && user.nickname === r.authorName ? true : false}
                  title={r.title ?? ''}
                  content={r.content ?? ''}
                  comments={r.comments ?? []}
                  onCommentSubmit={fetchCommentsForRecord}
                  onRecordModify={fetchRecord} />
                  /* 갱신 함수를 하위 컴포넌트로 전달 */}
            </div>
          ))}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            blockSize={blockSize}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}