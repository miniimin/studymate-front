import React from "react";
import styles from "./card.module.css";
import Link from "next/link";

const StudyStatus = ({ title, description, period, status, participants, role }: any) => {
  const isLeader = role === 'leader';
  const isInProgress = status === '진행중';
  const isCompleted = status === '완료';

  return (
    <Link href={`/study/detail-study`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p><strong>기간:</strong> {period}</p>
        <div className={styles.statusRow}>
          <span className={`${styles.statusBadge} ${isInProgress ? styles.inProgress : ''} ${isCompleted ? styles.completed : ''}`}>
            {status}
          </span>
          {isLeader && <span className={styles.leaderBadge}>방장</span>}
          {participants === 1 && (<span className={styles.soloBadge}>1인 스터디</span>
          )}
        </div>
      </div>
    </Link>)
}

export default StudyStatus;