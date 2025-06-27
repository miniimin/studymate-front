import React from "react";
import styles from "./card.module.css";
import Link from "next/link";

const StudySearch = ({ title, description, period, participants, maxParticipants }: any) => {
  return (
    <Link href={`/study/detail-study`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p><strong>기간:</strong> {period}</p>
        <p><strong>참여 인원:</strong> {participants}/{maxParticipants}명</p>
      </div>
      </Link>)
}

export default StudySearch;