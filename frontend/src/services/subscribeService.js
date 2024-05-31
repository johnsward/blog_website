import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
console.log('API URL:', process.env.REACT_APP_API_URL);

export const subscribe = (email) => {
    return API.post('/subscribers/subscribe', { email });
};
