import api from './api';

export const getTeachers = () => api.get('/users/teachers');
export const getMe = () => api.get('/users/me');
