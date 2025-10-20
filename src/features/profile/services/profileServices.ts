import { isAxiosError } from 'axios';
import { api } from '../../../services/api';

interface ProfileResponseApi {
    error: string | null;
}

export async function apiChangePassword(currentPassword: string, newPassword: string): Promise<ProfileResponseApi> {
    try {
        await api.put('/user/me/change-password', {
            currentPassword,
            newPassword,
        });
        return { error: null };
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                return { error: 'La contraseña actual es incorrecta' };
            }
        }

        return { error: 'Error al cambiar la contraseña. Inténtalo de nuevo más tarde.' };
    }
}

export async function apiUpdateUser(name: string, email: string): Promise<ProfileResponseApi> {
    try {
        await api.put('/user/me', {
            name,
            email,
        });
        return { error: null };
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 409) {
                return { error: 'El correo electrónico ya está en uso' };
            }
        }
        return { error: 'Error al actualizar el perfil. Inténtalo de nuevo más tarde.' };
    }
}
