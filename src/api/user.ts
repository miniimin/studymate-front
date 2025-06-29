import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const postUser = async (userData: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user`, userData);
        return response.data;
    } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
    }
}