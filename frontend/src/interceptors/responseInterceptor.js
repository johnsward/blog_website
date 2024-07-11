import axios from 'axios';

export const setupResponseInterceptor = () => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement your token refresh logic here
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};