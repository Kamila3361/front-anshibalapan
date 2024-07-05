import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://urchin-app-w8amb.ondigitalocean.app/', //'https://165.22.2.166:3000',
    timeout: 900000
});