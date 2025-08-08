import axios from 'axios';

export const getXsrfToken = async () => {
    const tokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/csrf`, {
        withCredentials: true,
    });
    const xsrfToken = tokenResponse.data?.token || tokenResponse.headers['X-XSRF-TOKEN'] || '';
    return xsrfToken;
}