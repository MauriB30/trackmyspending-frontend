import type User from './user';

export interface LoginResponse {
    user?: User;
    error?: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}
