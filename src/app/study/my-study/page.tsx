import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import StudyStatus from "@/components/study-card/StudyStatus";
import Link from "next/link";

export default function MyStudyPage() {

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
        <StudyStatus />
      </div>
      <div className={globalStyles.subtitle}>나의 완료 스터디</div>
      <div className={globalStyles.wrapperStyles}>
        <StudyStatus />
        <StudyStatus />
        <StudyStatus />
      </div>
    </>)
}