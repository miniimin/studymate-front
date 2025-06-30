'use client';
import styles from "./page.module.css";
import StudySearch from "@/components/study-card/StudySearch";
import StudyStatus from "@/components/study-card/StudyStatus";
import { getMain } from "@/api/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [myStudies, setMyStudies] = useState<any[]>([]);
  const [recruitingStudies, setRecruitingStudies] = useState<any[]>([]);
  useEffect(() => {
    getMain().then((data) => {
      setMyStudies(data.myStudies);
      setRecruitingStudies(data.recentStudies);
    }).catch((error) => {
      console.error("Error fetching main data:", error);
    });
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
        {(myStudies || []).map((study, index) => (
          <StudyStatus
            key={index}
            title={study.title}
            description={study.description}
            period={study.period}
            status={study.status}
            role={study.role}
            participants={study.participants}
          />
        ))}
      </div>
      <div className={styles.subtitle}>최근 올라온 스터디</div>
      <div className={styles.wrapperStyles}>
        {(recruitingStudies || []).map((study, index) => (
          <StudySearch
            key={index}
            title={study.title}
            description={study.description}
            period={study.period}
            participants={study.participants}
            maxParticipants={study.maxParticipants}
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
