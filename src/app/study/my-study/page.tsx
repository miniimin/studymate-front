'use client';

import { useEffect, useState } from "react";
import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import StudyStatus from "@/components/study-card/StudyStatus";
import Link from "next/link";
import { getOngoingStudy, getCompletedStudy } from "@/api/page";
import PaginationComponent from "@/components/pagination/Pagination";

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

interface StudyListPage {
  studies: MyStudyList[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isLast: boolean;
}

export default function MyStudyPage() {
  const [ongoingStudyList, setOngoingStudyList] = useState<StudyListPage>();
  const [completedStudyList, setCompletedStudyList] = useState<StudyListPage>();

  const [ongoingPage, setOngoingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const blockSize = 5;

  // 진행 중 스터디 불러오기
  const fetchOngoingStudies = async () => {
    try {
      const res = await getOngoingStudy(ongoingPage);
      setOngoingStudyList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOngoingStudies();
  }, [ongoingPage]);

  // 완료된 스터디 불러오기
  const fetcCompletedStudies = async () => {
    try {
      const res = await getCompletedStudy(completedPage);
      setCompletedStudyList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetcCompletedStudies();
  }, [completedPage]);

  // 페이지 핸들러
  const handleOngoingPageChange = (page: number) => setOngoingPage(page);
  const handleCompletedPageChange = (page: number) => setCompletedPage(page);

  return (
    <>
      <div className={globalStyles.title}>나의 스터디</div>
      <Link href={'/study/new-study'} className={styles.addStudyLink}>
        <button className={styles.addButton}>
          + 새로운 스터디 만들기
        </button>
      </Link>

      <div className={styles.subtitle}>나의 진행 중인 스터디</div>
      <div className={globalStyles.wrapperStyles}>
        {ongoingStudyList &&
          (!ongoingStudyList.studies || ongoingStudyList.studies.length === 0) ? (
          <><p>진행 중인 스터디가 없습니다.</p></>
        )
          : (ongoingStudyList?.studies?.map((study) => (
            <StudyStatus
              key={study.id}
              id={study.id}
              title={study.title}
              description={study.description}
              startDate={study.startDate}
              endDate={study.endDate}
              role={study.role}
              participantsMax={study.participantsMax} />
          )))}
      </div>
      {ongoingStudyList && (
        <PaginationComponent
          currentPage={ongoingPage}
          totalPages={ongoingStudyList.totalPages}
          blockSize={blockSize}
          onPageChange={handleOngoingPageChange}
        />
      )}
      <div className={styles.subtitle}>나의 완료 스터디</div>
      <div className={globalStyles.wrapperStyles}>
        {completedStudyList &&
          (!completedStudyList.studies || completedStudyList.studies.length === 0) ? (
          <p>완료된 스터디가 없습니다.</p>
        ) : (completedStudyList?.studies?.map((study) => (
          <StudyStatus
            key={study.id}
            id={study.id}
            title={study.title}
            description={study.description}
            startDate={study.startDate}
            endDate={study.endDate}
            role={study.role}
            participantsMax={study.participantsMax} />)))}
      </div>
      {completedStudyList && (
        <PaginationComponent
          currentPage={completedPage}
          totalPages={completedStudyList.totalPages}
          blockSize={blockSize}
          onPageChange={handleCompletedPageChange}
        />
      )}
    </>)
}