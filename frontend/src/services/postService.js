import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
console.log('API URL:', process.env.REACT_APP_API_URL);

export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const fetchPosts = () => API.get('/posts');

export const createPost = (formData) => {
    return API.post('/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deletePost = async (postId) => {
    try {
        await API.delete(`/posts/${postId}`);
        console.log('Post deleted successfully');
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};
