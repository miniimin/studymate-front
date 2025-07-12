import React from "react";
import styles from "./card.module.css";
import Link from "next/link";

const StudySearch = ({ id, title, description, startDate, endDate, participantsNum, maxParticipants, recruitDeadline }: any) => {
  return (
    <Link href={`/study/detail-study/${id}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p><strong>스터디 기간:</strong> {startDate} ~ {endDate}</p>
        <p><strong>참여 인원:</strong> {participantsNum}/{maxParticipants}명</p>
        <p><strong>모집 마감일:</strong> {recruitDeadline}</p>
      </div>
      </Link>)
}

export default StudySearch;