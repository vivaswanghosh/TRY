import api from './api';

export const getAssignments = () => api.get('/assignments');
export const createAssignment = (data) => api.post('/assignments/create', data);
export const submitAssignment = (data) => api.post('/assignments/submit', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const gradeSubmission = (id, data) => api.post(`/assignments/grade/${id}`, data);
