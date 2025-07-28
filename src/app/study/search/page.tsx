'use client'

import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StudySearch from "@/components/study-card/StudySearch";
import { getSearchStudy } from "@/api/page";
import { useRouter, useSearchParams } from "next/navigation";

interface Study {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participantsNum: number;
  participantsMax: number;
  recruitDeadline: string;
  createdAt: string;
}

export default function StudySearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query') || '';
  const pageParam = parseInt(searchParams.get('page') || '1');
  const blockSize = 3;

  // api에서 받아오는 값
  const [studies, setStudies] = useState<Study[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // 사용자가 입력하는 쿼리 값
  const [inputQuery, setInputQuery] = useState(queryParam);

  // 현재 페이지 기준으로 블록 시작번호 계산
  const currentBlock = Math.floor((pageParam - 1) / blockSize);
  const startPage = currentBlock * blockSize + 1;

  // 쿼리스트링 변경될 때 fetchStudy 호출하여 API에서 스터디 목록 받아오기
  const fetchStudy = async () => {
    try {
      const response = await getSearchStudy(pageParam, queryParam);
      const data: Study[] = response.data.searchStudyPageData.studies;
      setStudies(data);
      setTotalPages(parseInt(response.data.searchStudyPageData.totalPages));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchStudy();
  }, [pageParam, queryParam]);

  // 사용자가 검색 버튼 누르면 URL 변경하여 페이지 1부터 검색
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/study/search?query=${inputQuery}&page=1`);
  };

  // 현재 검색어 유지한 채 사용자가 페이지번호 URL 변경
  const movePage = (page: number) => {
    router.push(`/study/search?query=${queryParam}&page=${page}`);
  };


  return (<>
    <div className={globalStyles.title}>스터디 검색</div>
    <div>
      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="검색어를 입력하세요"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button className={styles.searchButton}>검색</button>
      </form>
    </div>
    <div className={globalStyles.wrapperStyles}>
      {studies.map((study, index) => (
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

    <div className={styles.pagination}>
      {(currentBlock > 0) && (
        <button onClick={() => movePage((currentBlock - 1) * blockSize + 1)} className={styles.blockButton}>
          이전
        </button>)}
      {Array.from({ length: blockSize }, (_, index) => {
        const pageNumber = startPage + index;
        if (pageNumber > totalPages) return null;
        return (
          <button
            key={index}
            onClick={() => movePage(pageNumber)}
            disabled={pageNumber === pageParam}
            className={styles.pageButton}>
            {pageNumber}
          </button>
        );
      })}
      {(currentBlock + 1) * blockSize < totalPages && (
        <button onClick={() => movePage((currentBlock + 1) * blockSize + 1)} className={styles.blockButton}>
          다음
        </button>
      )}
    </div>
  </>)
}