import api from './api';

export const getCalendar = () => api.get('/calendar');
export const updateCalendar = (data) => api.post('/calendar/update', data);
