import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const getMain = async () => {
    const response = await axios.get(`${apiUrl}/api/main`);
    return response.data;
}

export const postUser = async (userData: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}) => {
    const response = await axios.post(`${apiUrl}/api/user`, userData);
    return response.data;
}


export const login = async (loginData: {
    email: string;
    password: string;
}) => {
    const response = await axios.post(`${apiUrl}/api/user/login`, loginData);
    return response.data;
}