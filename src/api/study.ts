import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
axios.defaults.withCredentials = true;

// 스터디 생성
export const createStudy = async (studyData: any) => {
    const response = await axios.post(`${apiUrl}/api/studies`, studyData
    );
    return response;
}

// 스터디참가
export const joinStudy = async (studyId: any) => {
    const response = await axios.post(`${apiUrl}/api/studies/${studyId}/participants`);
    return response;
}

// 기록 남기기
export const submitRecord = async(studyId: any, newRecord: any) => {
    const response = await axios.post(`${apiUrl}/api/studies/${studyId}/records`, newRecord);
    return response;
}

// 덧글 남기기
export const submitComment = async (recordId: any, comment: any) => {
    const response = await axios.post(`${apiUrl}/api/records/${recordId}/comments`, { content: comment });
    return response;
}