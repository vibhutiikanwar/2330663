import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface NotificationQuery {
  limit?: number;
  page?: number;
  notification_type?: string;
}

export const fetchNotifications = async (params: NotificationQuery) => {
  const response = await apiClient.get('/notifications/user/demo', { params });
  return response.data;
};
