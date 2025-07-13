import axios from "axios";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const axiosClient = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: "http://localhost:8000",
    headers: {
        Accept: 'application/json',
    }
});

axiosClient.interceptors.request.use(config => {
    NProgress.set(.3);
    // Set Accept-Language header from localStorage or default to 'en'
    const lang = localStorage.getItem('language') || 'en';
    config.headers['Accept-Language'] = lang;
    return config;
});

axiosClient.interceptors.response.use(response => {
    NProgress.done();
    return response;
}, error => {
    NProgress.done();
    return Promise.reject(error);
});

export default axiosClient;
