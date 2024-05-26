import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

export const fetchPosts = () => API.get('/posts');
export const deletePosts = (id) => API.delete(`/posts/${id}`);
export const createPost = (formData) => API.post('/posts', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
