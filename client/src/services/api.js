import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  googleAuth: (accessToken, refreshToken) =>
    api.post('/auth/google-auth', { accessToken, refreshToken }),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Email endpoints
export const emailAPI = {
  fetchEmails: (pageToken = null) =>
    api.get('/emails/fetch', { params: { pageToken } }),
  getEmails: (page = 1, limit = 10, category = 'ALL') =>
    api.get('/emails', { params: { page, limit, category } }),
  getEmailDetails: (emailId) => api.get(`/emails/${emailId}`),
  updateAnalysis: (emailId, data) =>
    api.patch(`/emails/${emailId}/analysis`, data),
  archiveEmail: (emailId) => api.patch(`/emails/${emailId}/archive`),
};

// Deal endpoints
export const dealAPI = {
  getDeals: (page = 1, limit = 10, category = 'GOOD_DEAL', sort = 'newest') =>
    api.get('/deals', { params: { page, limit, category, sort } }),
  createDeal: (data) => api.post('/deals', data),
  updateDeal: (dealId, data) => api.patch(`/deals/${dealId}`, data),
  getStats: () => api.get('/deals/stats/summary'),
  exportCSV: () => api.get('/deals/export/csv', { responseType: 'blob' }),
};

// Analysis endpoints
export const analysisAPI = {
  analyzeEmail: (emailId) => api.post(`/analysis/email/${emailId}`),
  batchAnalyze: () => api.post('/analysis/batch'),
};

export default api;
