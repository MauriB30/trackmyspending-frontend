import axios from 'axios';

const BASE_URL = 'https://trackmyspending-backend.onrender.com/api';

export const api = axios.create({
    baseURL: BASE_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.endsWith('/auth/refresh')) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                await api.post('/auth/refresh', {});

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error al intentar refrescar el token:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
