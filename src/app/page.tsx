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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [ongoingStudyList, setongoingStudyList] = useState<MyStudyList[]>([]);
  const [recruitingStudyList, setRecruitingStudyList] = useState<SearchStudyList[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMain();
        console.log(res);

      } catch (err) {

      }
    };
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
            key={index}
            title={study.title}
            description={study.description}
            startDate={study.startDate}
            endDate={study.endDate}
            role={study.role}
          />
        ))}
      </div>
      <div className={styles.subtitle}>최근 올라온 스터디</div>
      <div className={styles.wrapperStyles}>
        {(recruitingStudyList).map((study, index) => (
          <StudySearch
            key={index}
            title={study.title}
            description={study.description}
            startDate={study.startDate}
            endDate={study.endDate}
            participants={study.participantsNum}
            maxParticipants={study.participantsMax}
          />
        ))}
        <StudySearch
          title="자바스크립트 심화 스터디"
          description="자바스크립트의 고급 개념을 배우고 실습하는 스터디입니다."
          period="2024.03.01 - 2024.05.31"
          participants={10}
          maxParticipants={15}
        />
        <StudySearch
          title="TypeScript 기초 스터디"
          description="TypeScript의 기초부터 시작하는 스터디입니다."
          period="2024.04.01 - 2024.06.30"
          participants={8}
          maxParticipants={12}
        />
      </div>
    </>
  );
}
