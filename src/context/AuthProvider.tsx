import { useEffect, useState } from 'react';
import { apiCheckSession, apiLogin, apiLogout, apiRegister } from '../features/auth/services/authServices';
import type User from '../types/user';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(user);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await apiCheckSession();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Error checking session:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    async function register(name: string, username: string, password: string) {
        const { success, message } = await apiRegister(name, username, password);

        return { success, message };
    }

    async function login(username: string, password: string) {
        const { user, error } = await apiLogin(username, password);

        if (user && !error) {
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }

        return error;
    }

    function logout() {
        apiLogout();
        setUser(null);
    }

    return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>;
}
