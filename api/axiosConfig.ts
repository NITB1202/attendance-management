import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://13.250.63.20:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return null;
    }

    const response = await axios.post('http://13.250.63.20:8000/auth/refresh', {
      refreshToken,
    });

    const newAccessToken = response.data.accToken;
    const newRefreshToken = response.data.refreshToken;

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    sessionStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    let token = sessionStorage.getItem('accessToken');
    if(!token) token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

