import axios from 'axios';

const hostname = window.location.hostname;
const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.');
const API_URL = import.meta.env.VITE_API_URL || (isLocal ? `http://${hostname}:5000/api` : 'https://curamind-backend.onrender.com/api');

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000, // 30s timeout for Render cold starts
  headers: {
    'Content-Type': 'application/json'
  }
});

// Retry interceptor for network errors and timeouts
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || !config.retry) {
      config.retry = 0;
    }
    // Retry up to 2 times for network errors or timeouts
    if (config.retry < 2 && (error.code === 'ECONNABORTED' || error.message === 'Network Error')) {
      config.retry += 1;
      await new Promise(resolve => setTimeout(resolve, 2000));
      return instance(config);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
