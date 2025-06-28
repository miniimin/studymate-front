'use client';

import { useState } from 'react';
import styles from './page.module.css';
import RecordList from '@/components/RecordList';
import StatusBoard from '@/components/StatusBoard';
import Link from 'next/link';

const studyData = {
  title: '프론트엔드 심화 스터디',
  description: 'React, TypeScript, Next.js 등 프론트엔드 기술 심화 학습을 위한 스터디입니다.',
  startDate: '2025-06-01',
  endDate: '2025-08-31',
  deadline: '2025-05-30',
  participants: ['user123', 'user456'],
  maxParticipants: 5,
  leaderId: 'user123',
  leaderName: '홍길동',
  records: [
    {
      id: 'rec1',
      title: '1주차 회고',
      content: 'Hooks 개념 복습 및 커스텀 훅 구현 실습 공유.',
      author: 'user456',
      date: '2025-06-08',
    },
    {
      id: 'rec2',
      title: '2주차 발표',
      content: 'Next.js의 SSR과 SSG 비교 및 구현 실습 진행.',
      author: 'user123',
      date: '2025-06-15',
    },
  ],
  members: [
    { id: 'user123', name: '홍길동', progress: 80 },
    { id: 'user456', name: '김개발', progress: 60 },
  ],
};

const user = {
  id: 'user123',
  name: '홍길동',
};

export default function StudyDetailPage() {

  const isParticipant = !studyData.participants.includes(user.id);
  const isLeader = studyData.leaderId === user.id;
  const isEnded = new Date() > new Date(studyData.endDate);

  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState(studyData.records || []);
  const [newRecord, setNewRecord] = useState({ title: '', content: '' });

  const toggleForm = () => setShowForm(prev => !prev);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className={styles.studyInfo}>
        <h2>{studyData.title}</h2>
        <p>{studyData.description}</p>
        <ul>
          <li>스터디 기간</li><li>{studyData.startDate} ~ {studyData.endDate}</li>
          <li>모집 마감일</li><li>{studyData.deadline || '없음'}</li>
          <li>참여인원</li><li>{studyData.participants.length} / {studyData.maxParticipants}</li>
          <li>방장</li><li>{studyData.leaderName}</li>
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
                      <input id="title" name="title" className={styles.input} />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="content" className={styles.label}>내용</label>
                      <textarea id="content" name="content" className={styles.textarea} />
                    </div>

                    <div className={styles.buttonWrapper}>
                      <button type="submit" className={styles.submitButton}>등록</button>
                    </div>
                  </form>)}
              </>
            )}
          </>
        ) : (
          <button className={styles.joinButton}>참여하기</button>
        )}
      </section>
      <RecordList
        records={records}
        isReadOnly={!isParticipant}
      />
      <StatusBoard members={studyData.members} />
    </>
  );
}