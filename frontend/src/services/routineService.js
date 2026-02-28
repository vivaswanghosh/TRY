import api from './api';

export const getRoutine = (semester, department, year) =>
    api.get('/routine', { params: { semester, department, year } });

export const updateRoutine = (data) => api.post('/routine/update', data);
