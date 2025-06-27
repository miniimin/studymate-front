'use client';

import { useState } from 'react';
import styles from './page.module.css';
import RecordList from '@/components/RecordList';
import StudyStatusBoard from '@/components/StudyStatusBoard';

export default function StudyDetailPage({ studyData, user }: any) {
  const isParticipant = studyData.participants.includes(user.id);
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
    <div className={styles.page}>
      <section className={styles.studyInfo}>
        <h2>{studyData.title}</h2>
        <p>{studyData.description}</p>
        <ul>
          <li>기간: {studyData.startDate} ~ {studyData.endDate}</li>
          <li>모집 마감일: {studyData.deadline || '없음'}</li>
          <li>참여: {studyData.participants.length} / {studyData.maxParticipants}</li>
          <li>방장: {studyData.leaderName}</li>
        </ul>
      </section>

      {isParticipant ? (
        <>
          {!isEnded ? (
            <button onClick={toggleForm}>기록 남기기</button>
          ) : (
            <div className={styles.finished}>스터디 완료</div>
          )}

          {showForm && (
            <form >
              <input name="title" />
              <textarea name="content" />
              <button type="submit">등록</button>
            </form>
          )}

          <RecordList
            records={records}
            allowComment={true}
          />
        </>
      ) : (
        <>
          <button className={styles.joinButton}>참여하기</button>
          <RecordList records={records} isReadOnly />
        </>
      )}

      <RecordList
        records={records}
        isReadOnly={!isParticipant}
      />

      {isParticipant && (
        <StudyStatusBoard members={studyData.members} />
      )}
    </div>
  );
}