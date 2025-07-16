'use client';

import { useEffect, useState } from "react";
import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import StudyStatus from "@/components/study-card/StudyStatus";
import Link from "next/link";
import { getOngoingStudy, getCompletedStudy } from "@/api/page";
import { useUser } from "@/context/UserContext";

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

  // 페이지 블럭 세팅값
  const pageLimit = 3;
  const ongoingPageBlock = Math.floor((ongoingPage - 1) / pageLimit);
  const ongoingStartPage = ongoingPageBlock * pageLimit + 1;
  const completedPageBlock = Math.floor((completedPage - 1) / pageLimit);
  const completedStartPage = completedPageBlock * pageLimit + 1;

  // const fetch = async () => {
  //   try {
  //     const res = await getMyStudy();
  //     setOngoingStudyList(res.data.ongoingStudyList);
  //     setCompletedStudyList(res.data.completedStudyList);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   fetch();
  // }, []);

  const fetchOngoingStudies = async (pageNum: number) => {
    try {
      const res = await getOngoingStudy(pageNum);
      setOngoingStudyList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOngoingStudies(ongoingPage);
  }, [ongoingPage]);


  const fetcCompletedStudies = async (pageNum: number) => {
    try {
      const res = await getCompletedStudy(pageNum);
      setCompletedStudyList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetcCompletedStudies(completedPage);
  }, [completedPage]);

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
        <div className={styles.pagination}>
          {ongoingPageBlock > 0 && (
            <button className={styles.blockButton} onClick={() => {
              setOngoingPage((ongoingPageBlock - 1) * pageLimit + 1);
            }}>
              이전
            </button>
          )}
          {Array.from({ length: pageLimit }, (_, index) => {
            if (ongoingStartPage + index > ongoingStudyList.totalPages) return null;
            return (
              <button
                key={index}
                onClick={() => setOngoingPage(ongoingStartPage + index)}
                disabled={ongoingPage === ongoingStartPage + index}
                className={ongoingPage === ongoingStartPage + index ? styles.currentPageButton : styles.pageButton}
              >
                {ongoingStartPage + index}
              </button>
            );
          })}
          {(ongoingPageBlock + 1) * pageLimit < ongoingStudyList.totalPages && (
            <button className={styles.blockButton} onClick={() => {
              setOngoingPage((ongoingPageBlock + 1) * pageLimit + 1);
            }}>
              다음
            </button>
          )}
        </div>
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
        <div className={styles.pagination}>
          {completedPageBlock > 0 && (
            <button className={styles.blockButton} onClick={() => {
              setCompletedPage((completedPageBlock - 1) * pageLimit + 1);
            }}>
              이전
            </button>
          )}
          {Array.from({ length: pageLimit }, (_, index) => {
            if (completedStartPage + index > completedStudyList.totalPages) return null;
            return (
              <button
                key={index}
                onClick={() => setCompletedPage(completedStartPage + index)}
                disabled={completedPage === completedStartPage + index}
                className={completedPage === completedStartPage + index ? styles.currentPageButton : styles.pageButton}
              >
                {completedStartPage + index}
              </button>
            );
          })}
          {(completedPageBlock + 1) * pageLimit < completedStudyList.totalPages && (
            <button className={styles.blockButton} onClick={() => {
              setCompletedPage((completedPageBlock + 1) * pageLimit + 1);
            }}>
              다음
            </button>
          )}
        </div>
      )}
    </>)
}