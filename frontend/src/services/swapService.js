import api from './api';

export const createSwapRequest = (data) => api.post('/swaps/create', data);
export const getSwapRequests = () => api.get('/swaps');
export const respondSwapRequest = (id, data) => api.post(`/swaps/respond/${id}`, data);
