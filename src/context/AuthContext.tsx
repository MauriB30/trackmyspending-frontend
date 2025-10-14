import { createContext } from 'react';
import type User from '../types/user';

export interface AuthContextProps {
    user: User | null;
    isLoading: boolean;
    login(username: string, password: string, rememberMe: boolean): Promise<string | undefined>;
    logout(): void;
    register(name: string, username: string, password: string): void;
}

export const AuthContext = createContext({} as AuthContextProps);
