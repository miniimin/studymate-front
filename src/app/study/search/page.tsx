'use client'

import globalStyles from "@/app/page.module.css";
import styles from "./page.module.css";
import React from "react";
import { useState } from "react";
import StudySearch from "@/components/study-card/StudySearch";
import axios from "axios";

const apiUrl = process.env.LOCAL_API_URL;

const dummyStudies = [
  {
    title: "Vue.js 입문 스터디",
    description: "Vue 기본기를 익히고 실습하는 스터디입니다.",
    period: "2024.06.01 - 2024.08.31",
    participants: 4,
    maxParticipants: 8,
  },
  {
    title: "알고리즘 면접 대비 스터디",
    description: "코테 유형을 집중적으로 연습하는 스터디입니다.",
    period: "2024.07.01 - 2024.09.30",
    participants: 6,
    maxParticipants: 10,
  },
];

export default function StudySearchPage() {
  const [query, setQuery] = useState("");

  const filteredStudies = dummyStudies;

  return (<>
    <div className={globalStyles.title}>스터디 검색</div>
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchButton}>검색</button>
    </div>
    <div className={globalStyles.wrapperStyles}>
      {filteredStudies.map((study, index) => (
        <StudySearch
          key={index}
          title={study.title}
          description={study.description}
          period={study.period}
          participants={study.participants}
          maxParticipants={study.maxParticipants}
        />
      ))}
    </div>
  </>)
}