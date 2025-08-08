import axios from "axios";
import { getXsrfToken } from "@/components/XsrfToken";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
axios.defaults.withCredentials = true;

interface StudyData {
    title: string,
    description: string,
    participantsMax: string,
    startDate: string,
    endDate: string,
    alwaysRecruit: string,
    recruitDeadline: string
}

interface RecordData {
    title: string,
    content: string
}

// 스터디 생성
export const createStudy = async (studyData: StudyData) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.post(`${apiUrl}/api/studies`, studyData, {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    }
    );
    return response;
}

// 스터디참가
export const joinStudy = async (studyId: string) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.post(`${apiUrl}/api/studies/${studyId}/participants`, '', {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    });
    return response;
}



// 기록 남기기
export const submitRecord = async (studyId: string, newRecord: RecordData) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.post(`${apiUrl}/api/studies/${studyId}/records`, newRecord, {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    });
    return response;
}

// 기록 수정하기
export const modifyRecord = async (recordId: number, modifiedRecord: RecordData) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.put(`${apiUrl}/api/records/${recordId}`, modifiedRecord, {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    });
    return response;
}



// 덧글 남기기
export const submitComment = async (recordId: number, comment: string) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.post(`${apiUrl}/api/records/${recordId}/comments`, { content: comment }, {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    });
    return response;
}

// 덧글 수정하기
export const modifyComment = async (commentId: number, comment: string) => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.put(`${apiUrl}/api/comments/${commentId}`, { content: comment }, {
        headers: {
            'X-XSRF-TOKEN': xsrfToken
        }
    });
    return response;
}



// 특정 기록의 덧글 전체 가져오기
export const getComments = async (recordId: number) => {
    const response = await axios.get(`${apiUrl}/api/records/${recordId}/comments`);
    return response;
}

// 특정 스터디의 기록 목록을 페이지 단위로 조회
export const getRecordPage = async (studyId: string, pageNum: number) => {
    const response = await axios.get(`${apiUrl}/api/page/studies/${studyId}/records`, {
        params: {
            page: pageNum,
            size: 5
        }
    });
    return response;
}