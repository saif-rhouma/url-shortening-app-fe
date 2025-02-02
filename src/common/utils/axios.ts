import axios from 'axios';
import { CONFIG } from '../../configs/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
  timeout: 120000, // 2min
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here if necessary
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!'),
);

export default axiosInstance;

export const endpoints = {
  shortenedUrl: {
    list: '/api/',
    create: '/api/',
    detail: '/api/',
    visit: '/api/visit/',
    qrCodeImage: '/api/qr/',
  },
};
