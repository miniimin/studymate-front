import styles from "./page.module.css";
import StudySearch from "@/components/study-card/StudySearch";
import StudyStatus from "@/components/study-card/StudyStatus";

export default function Home() {
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
        <StudyStatus
          title="리액트 기초 스터디"
          description="리액트의 기초부터 심화까지 학습하는 스터디입니다."
          period="2024.01.01 - 2024.03.31"
          status="진행중"
          role="leader"
          participants={3}
        />
        <StudyStatus
          title="Next.js 심화 스터디"
          description="Next.js의 고급 기능을 배우고 프로젝트에 적용하는 스터디입니다."
          period="2024.02.01 - 2024.04.30"
          status="완료"
          role="member"
          participants={1}
        />
        <StudyStatus/>
        </div>
        <div className={styles.subtitle}>최근 올라온 스터디</div>
        <div className={styles.wrapperStyles}>
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
