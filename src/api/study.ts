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
export const submitRecord = async (studyId: any, newRecord: any) => {
    const response = await axios.post(`${apiUrl}/api/studies/${studyId}/records`, newRecord);
    return response;
}

// 덧글 남기기
export const submitComment = async (recordId: any, comment: any) => {
    const response = await axios.post(`${apiUrl}/api/records/${recordId}/comments`, { content: comment });
    return response;
}

// 특정 기록의 덧글 전체 가져오기
export const getComments = async (recordId: any) => {
    const response = await axios.get(`${apiUrl}/api/records/${recordId}/comments`);
    return response.data;
}

// 특정 스터디의 기록 페이지 패치
export const getRecordPage = async (studyId: any, pageNum: number) => {
    const response = await axios.get(`${apiUrl}/api/page/studies/${studyId}/records`, {
        params: {
            page: pageNum,
            size: 5
        }
    });
    return response;
}
