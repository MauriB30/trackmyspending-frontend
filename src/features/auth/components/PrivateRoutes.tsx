import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import Loading from '../../../layouts/Loading';
import MainLayout from '../../../layouts/MainLayout';

export default function PrivateRoutes() {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to='/login' />;
    }

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}
