import { AxiosError } from 'axios';
import { api } from '../../../services/api';
import type { LoginResponse } from '../../../types/authResponses';
import type User from '../../../types/user';

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
    try {
        const { data } = await api.post(`/auth/login`, {
            email,
            password,
        });

        return { user: data.user };
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                return { error: 'Email o contraseña incorrectos' };
            }
        }

        return { error: 'Ocurrió un error inesperado' };
    }
}

export async function apiLogout() {
    try {
       const response = await api.post('/auth/logout');
       console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export async function apiRegister(name: string, email: string, password: string) {
    try {
        const response = await api.post(`/auth/register`, {
            name,
            email,
            password,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                return { error: error.response.data };
            }
        }
        return { error: 'Ocurrió un error inesperado' };
    }
}

export async function apiCheckSession(): Promise<User | null> {
    try {
        const response = await api.get('/users/me');
        console.log(response);

        const user: User = response.data;

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}
