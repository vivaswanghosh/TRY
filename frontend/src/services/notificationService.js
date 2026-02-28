import api from './api';

export const getNotifications = () => api.get('/notifications');
export const createNotification = (data) => api.post('/notifications', data);
