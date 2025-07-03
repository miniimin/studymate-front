import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

// 메인페이지
export const getMain = async () => {
    const response = await axios.get(`${apiUrl}/api/main`,
        { withCredentials: true });
    return response;
}

// 로그인 상태 확인
export const fetchUser = async () => {
    const response = await axios.get(`${apiUrl}/api/users/me`,
        { withCredentials: true });
    return response;
}

// 스프링 시큐리티 폼 회원가입
export const postUser = async (userData: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}) => {
    const response = await axios.post(`${apiUrl}/api/users`, userData,
        { withCredentials: true });
    return response;
}

// 스프링 시큐리티 폼 로그인
export const login = async (loginData: {
    email: string;
    password: string;
}) => {
    const formData = new FormData();
    formData.append('username', loginData.email);
    formData.append('password', loginData.password);
    console.log('로그인요청');
    const response = await axios.post(`${apiUrl}/api/auth/login`,

        formData,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        }
    );
    return response;
}

// 스프링 시큐리티 폼 로그아웃
export const logout = async () => {
    const response = await axios.post(`${apiUrl}/api/auth/logout`,
        new FormData(),
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    return response;
}

export const createStudy = async (studyData: any) => {
    const response = await axios.post(`${apiUrl}/api/studies`, studyData);
    return response;
}