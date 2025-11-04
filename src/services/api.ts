import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest.url?.endsWith('/user/me')) {
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
