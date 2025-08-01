import { Suspense } from "react";
import StudySearchComponent from "./component";
import globalStyles from "@/app/page.module.css";

export default function StudySearchPage() {
  return (
    <>
      <div className={globalStyles.title}>스터디 검색</div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <StudySearchComponent />
      </Suspense>
    </>)
}