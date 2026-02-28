import api from './api';

export const getRoutine = (semester) => api.get('/routine', { params: { semester } });
export const updateRoutine = (data) => api.post('/routine/update', data);
