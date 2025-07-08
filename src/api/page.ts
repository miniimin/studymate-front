import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
axios.defaults.withCredentials = true;

// 페이지 view
// 메인 페이지
export const getMain = async () => {
    const response = await axios.get(`${apiUrl}/api/page/main`);
    return response;
}

// 나의 스터디 페이지
export const getMyStudy = async (studyId: string) => {
    const response = await axios.get(`${apiUrl}/api/page/my-study`);
    return response;
}

// 스터디 검색 페이지
export const getSearchStudy = async () => {
    const response = await axios.get(`${apiUrl}/api/page/search-study`);
    return response;
}

// 스터디 상세 조회 페이지
export const getStudyFeed = async (studyId: string) => {
    const response = await axios.get(`${apiUrl}/api/page/studies/${studyId}`);
    console.log(response);
    return response;
}

// 스터디 상세조회 페이지 - 스터디 기록 상세 조회
export const getRecordDetail = async (studyId: string, recordId: string) => {
    const response = await axios.get(`${apiUrl}/api/studies/${studyId}/records/${recordId}/details`);
    return response;
}