import axios from 'axios';
import { setupAuthInterceptor } from './authInterceptor';
import { setupResponseInterceptor } from './responseInterceptor';

// Optionally, configure a base Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Apply the interceptors to the Axios instance
setupAuthInterceptor(api);
setupResponseInterceptor(api);

export default api;