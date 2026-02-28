import api from './api';

export const createQuiz = (data) => api.post('/quizzes/create', data);
export const getQuizzes = (params) => api.get('/quizzes', { params });
export const getQuiz = (id) => api.get(`/quizzes/${id}`);

export const startQuizAttempt = (id) => api.post(`/quizzes/${id}/start`);
export const submitQuizAttempt = (attemptId, data) => api.post(`/quizzes/attempt/${attemptId}/submit`, data);
export const autoSubmitQuizAttempt = (attemptId, data) => api.post(`/quizzes/attempt/${attemptId}/autosubmit`, data);

export const getQuizAttempts = (id) => api.get(`/quizzes/${id}/attempts`);
export const resetQuizAttempt = (attemptId) => api.delete(`/quizzes/attempt/${attemptId}/reset`);
