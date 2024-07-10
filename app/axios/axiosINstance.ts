import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",//'https://aibala.me/', //'https://165.22.2.166:3000',
    timeout: 900000
});