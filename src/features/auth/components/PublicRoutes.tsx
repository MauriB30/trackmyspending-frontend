import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import AuthLayout from '../../../layouts/AuthLayout';
import Loading from '../../../layouts/Loading';

export default function PublicRoutes() {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />;
    }
    if (user) {
        return <Navigate to='/' />;
    }

    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
}
