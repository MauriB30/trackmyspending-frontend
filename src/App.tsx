import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import AuthProvider from './context/AuthProvider';
import PrivateRoutes from './features/auth/components/PrivateRoutes';
import PublicRoutes from './features/auth/components/PublicRoutes';
import NotFound from './layouts/NotFound';
import Loading from './layouts/Loading';

const Home = lazy(() => import('./features/home/pages/Home'));
const Login = lazy(() => import('./features/auth/pages/Login'));
const Register = lazy(() => import('./features/auth/pages/Register'));
const ForgotPassword = lazy(() => import('./features/auth/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./features/auth/pages/ResetPassword'));
const Profile = lazy(() => import('./features/profile/pages/Profile'));
const ProfileInfo = lazy(() => import('./features/profile/pages/ProfileInfo'));
const ChangePassword = lazy(() => import('./features/profile/pages/ChangePassword'));
const Wallets = lazy(() => import('./pages/Wallets/Wallets'));
const Currencies = lazy(() => import('./pages/Currencies/Currencies'));
const Transactions = lazy(() => import('./pages/Transactions/Transactions'));
const Categories = lazy(() => import('./pages/Categories/Categories'));

export default function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<div className='loading-screen'><Loading/></div>}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                    </Route>

                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<Home />} />
                        <Route path='wallets' element={<Wallets />} />
                        <Route path='currencies' element={<Currencies />} />
                        <Route path='transactions' element={<Transactions />} />
                        <Route path='profile' element={<Profile />}>
                            <Route index element={<ProfileInfo />} />
                            <Route path='change-password' element={<ChangePassword />} />
                        </Route>
                        <Route path='categories' element={<Categories />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
            <Toaster toastOptions={{ style: { color: 'white', background: '#23303c', fontSize: '20px' } }} />
        </AuthProvider>
    );
}
