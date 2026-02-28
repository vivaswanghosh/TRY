import api from './api';

export const uploadBook = (data) => api.post('/library/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getBooks = () => api.get('/library/books');
