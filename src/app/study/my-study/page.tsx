'use client';

import { useEffect, useState } from "react";
import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import StudyStatus from "@/components/study-card/StudyStatus";
import Link from "next/link";
import { getMyStudy } from "@/api/page";
import { on } from "events";

interface MyStudyList {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  role: string;
  recruitDeadline: string;
  participantsMax: string;
}

export default function MyStudyPage() {
  const [ongoingStudyList, setOngoingStudyList] = useState<MyStudyList[]>([]);
  const [completedStudyList, setCompletedStudyList] = useState<MyStudyList[]>([]);

  const fetch = async () => {
    try {
      const res = await getMyStudy();
      console.log(res.data);
      setOngoingStudyList(res.data.ongoingStudyList);
      setCompletedStudyList(res.data.completedStudyList);
      console.log("뭐지" + ongoingStudyList);
      console.log("뭐지" + res.data.ongoingStudyList);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className={globalStyles.title}>나의 스터디</div>
      <Link href={'/study/new-study'} className={styles.addStudyLink}>
        <button className={styles.addButton}>
          + 새로운 스터디 만들기
        </button>
      </Link>

      <div className={globalStyles.subtitle}>나의 진행 중인 스터디</div>
      <div className={globalStyles.wrapperStyles}>
        {ongoingStudyList?.map((study, index) => (<StudyStatus
          key={study.id}
          id={study.id}
          title={study.title}
          description={study.description}
          startDate={study.startDate}
          endDate={study.endDate}
          role={study.role}
          participantsMax={study.participantsMax} />))}
      </div>
      <div className={globalStyles.subtitle}>나의 완료 스터디</div>
      <div className={globalStyles.wrapperStyles}>
        {completedStudyList?.map((study, index) => (<StudyStatus
          key={study.id}
          id={study.id}
          title={study.title}
          description={study.description}
          startDate={study.startDate}
          endDate={study.endDate}
          role={study.role}
          participantsMax={study.participantsMax} />))}
      </div>
    </>)
}