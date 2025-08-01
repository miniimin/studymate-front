import React from "react";
import styles from "./card.module.css";
import Link from "next/link";

interface StudyStatusProps {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  role: string;
  participantsMax: number;
}


const StudyStatus = ({ id, title, description, startDate, endDate, role, participantsMax }: StudyStatusProps) => {
  const isLeader = role === 'LEADER';
  const splitStartDate = startDate.split('T')[0];
  const splitEndDate = endDate.split('T')[0];
  const status = splitEndDate >= new Date().toISOString().split('T')[0] ? '진행 중' : '완료';

  return (
    <Link href={`/study/detail-study/${id}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p><strong>스터디 기간</strong> {splitStartDate} ~ {splitEndDate} </p>
        <div className={styles.statusRow}>
          <span className={`${styles.statusBadge} 
          ${status === '진행 중' ? styles.inProgress : ''} 
          ${status === '완료' ? styles.completed : ''}`}>
            {status}
          </span>
          {participantsMax === 1
            ? (<span className={styles.soloBadge}>1인 스터디</span>)
            : isLeader
            && <span className={styles.leaderBadge}>방장</span>
              /*<span className={styles.participantBadge}>멤버</span>*/}
        </div>
      </div>
    </Link>)
}

export default StudyStatus;