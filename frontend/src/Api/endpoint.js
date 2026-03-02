import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://localhost:3400/api/v1",
    withCredentials:true
});

export const post = (url,data)=>axiosInstance.post(url,data);
