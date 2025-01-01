import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    attachToken?: boolean; 
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://13.250.63.20:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    if (config.attachToken) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('Response Error:', error.response || error.message);
    if (error.response?.status === 401) {
      console.log('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
