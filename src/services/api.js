import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 基于 package.json文件的proxy配置 http://localhost:5001/api
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, logging out or redirecting...');
      localStorage.removeItem('token'); // 清除token
      // window.location.href = '/login'; // 可重定向
    }
    return Promise.reject(error);
  }
);

export default api;