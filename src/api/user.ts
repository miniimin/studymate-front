import axios from "axios";
import { getXsrfToken } from "@/components/XsrfToken";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
axios.defaults.withCredentials = true;


// auth
// 로그인 상태 확인
export const fetchUser = async () => {
    const response = await axios.get(`${apiUrl}/api/users/me`);
    return response;
}

// 스프링 시큐리티 폼 회원가입
export const postUser = async (userData: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}) => {
    const response = await axios.post(`${apiUrl}/api/users`, userData);
    return response;
}

// 스프링 시큐리티 폼 로그인
export const login = async (loginData: {
    email: string;
    password: string;
}) => {
    const xsrfToken = await getXsrfToken();
    const params = new URLSearchParams();
    params.append('username', loginData.email);
    params.append('password', loginData.password);
    const response = await axios.post(`${apiUrl}/api/auth/login`,
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': xsrfToken
            },
            withCredentials: true,
        }
    );
    return response;
}

// 스프링 시큐리티 폼 로그아웃
export const logout = async () => {
    const xsrfToken = await getXsrfToken();
    const response = await axios.post(`${apiUrl}/api/auth/logout`,
        new FormData(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-XSRF-TOKEN': xsrfToken
            },
        });
    return response;
}
