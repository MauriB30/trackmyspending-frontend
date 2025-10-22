import { AxiosError } from 'axios';
import { api } from '../../../services/api';
import type { LoginResponse, RegisterResponse } from '../../../types/authResponses';
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

        return { error: 'Ocurrió un error inesperado, Inténtalo de nuevo más tarde.' };
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

export async function apiRegister(name: string, email: string, password: string): Promise<RegisterResponse> {
    try {
        await api.post(`/auth/register`, {
            name,
            email,
            password,
        });

        return { success: true, message: 'Usuario registrado con éxito' };
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
                return { success: false, message: 'El email ya está registrado.' };
            }
        }
        return { success: false, message: 'Ocurrió un error inesperado, Inténtalo de nuevo más tarde.' };
    }
}

export async function apiCheckSession(): Promise<User | null> {
    try {
        const response = await api.get('/user/me');
        console.log(response);

        const user: User = response.data;

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}
