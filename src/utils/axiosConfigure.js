import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('head_start'));
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data === 'Invalid token' ) {
      localStorage.removeItem('head_start');
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;