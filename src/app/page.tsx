'use client';
import styles from "./page.module.css";
import StudySearch from "@/components/study-card/StudySearch";
import StudyStatus from "@/components/study-card/StudyStatus";
import { getMain } from "@/api/page";
import { useEffect, useState } from "react";

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

interface SearchStudyList {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participantsNum: number;
  participantsMax: number;
  recruitDeadline: string;
}

export default function Home() {
  const [ongoingStudyList, setOngoingStudyList] = useState<MyStudyList[]>([]);
  const [recruitingStudyList, setRecruitingStudyList] = useState<SearchStudyList[]>([]);

  const fetch = async () => {
    try {
      const res = await getMain();
      if (res.data.ongoingStudyList !== null) {
        setOngoingStudyList(res.data.ongoingStudyList);
      }
      if (res.data.recruitingStudyList.studies.length > 0) {
        setRecruitingStudyList(res.data.recruitingStudyList.studies);
        console.log("뭐지" + recruitingStudyList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [])

  return (
    <>
      <div className={styles.fullWidthBlock}>
        <div className={styles.intro}>
          <ol>
            <li><p style={{ fontSize: '5rem', paddingBottom: '1rem' }}>📋</p></li>
            <li>스터디를 혼자서도, 여럿이서도 기록하고 지속하도록 도와주는</li>
            <li>온라인 스터디 플랫폼 <strong>Keeply</strong></li>
            <li><br /></li>
            <li>간단하게 시작하고, 꾸준하게 남기세요</li>
          </ol>
        </div>
      </div>
      <div className={styles.subtitle}>나의 진행 중인 스터디</div>
      <div className={styles.wrapperStyles}>
        {ongoingStudyList.map((study, index) => (
          <StudyStatus
            key={study.id}
            id={study.id}
            title={study.title}
            description={study.description}
            startDate={study.startDate}
            endDate={study.endDate}
            role={study.role}
            participantsMax={study.participantsMax}
          />
        ))}
      </div>
      <div className={styles.subtitle}>최근 올라온 스터디</div>
      <div className={styles.wrapperStyles}>
        {recruitingStudyList.map((study, index) => (
          <StudySearch
            key={study.id}
            id={study.id}
            title={study.title}
            description={study.description}
            startDate={study.startDate}
            endDate={study.endDate}
            participantsNum={study.participantsNum}
            maxParticipants={study.participantsMax}
            recruitDeadline={study.recruitDeadline}
          />
        ))}
      </div>
    </>
  );
}
