'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import RecordList from '@/components/RecordList';
import { redirect, useParams } from 'next/navigation';
import { getStudyFeed } from '@/api/page';
import { joinStudy, submitRecord } from '@/api/study';

interface StudyDetail {
  id: number;
  title: string;
  description: string;
  creatorName: string;
  startDate: string;
  endDate: string;
  participantsMax: number;
  recruitDeadline: string;
  records: RecordList[];
}

interface RecordList {
  id: number;
  studyGroupId: number;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function StudyDetailPage() {
  const { id: studyId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isParticipant, setIsParticipant] = useState(false);
  const [studyDetail, setStudyDetail] = useState<StudyDetail | null>(null);
  const [participantNum, setParticipantNum] = useState(0);
  const [recordList, setRecordList] = useState<RecordList[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', content: '' });

  useEffect(() => {
    if (!studyId || typeof studyId !== 'string') return;

    const fetchStudy = async () => {
      try {
        const res = await getStudyFeed(studyId);
        console.log(res.data);
        setIsParticipant(res.data.isParticipant);
        setStudyDetail(res.data.studyDetail);
        setParticipantNum(res.data.participantNum);
        setRecordList(res.data.recordList);
      } catch (err) {
        setError('스터디 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudy();
  }, [studyId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!studyDetail) return <p>데이터가 없습니다.</p>;

  const isEnded = new Date() > new Date(studyDetail.endDate);
  const toggleForm = () => setShowForm(prev => !prev);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleJoinStudy = async (e: any) => {
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

  const handleRecordSubmit = async (e: any) => {
    try {
      const res = await submitRecord(studyId, newRecord);
      location.reload();
    } catch (err) {
      alert('제출 실패');
    }
  }

  return (
    <>
      <section className={styles.studyInfo}>
        <h2>{studyDetail.title}</h2>
        <p>{studyDetail.description}</p>
        <ul>
          <li>스터디 기간</li><li>{studyDetail.startDate} ~ {studyDetail.endDate}</li>
          <li>참여인원</li><li>{participantNum} / {studyDetail.participantsMax}</li>
          <li>방장</li><li>{studyDetail.creatorName}</li>
        </ul>
      </section>
      <section className={styles.buttonSection}>
        {isParticipant ? (
          <>
            {isEnded ? (
              <div className={styles.finished}>스터디 완료</div>
            ) : (
              <>
                <button className={styles.recordToggleButton} onClick={toggleForm}>기록 남기기</button>
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
      <RecordList
        records={recordList}
        isParticipant={isParticipant}
      />
      {/*<StatusBoard members={studyData.members} />*/}
    </>
  );
}