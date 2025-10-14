import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import AuthProvider from './context/AuthProvider';
import PrivateRoutes from './features/auth/components/PrivateRoutes';
import PublicRoutes from './features/auth/components/PublicRoutes';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import ResetPassword from './features/auth/pages/ResetPassword';
import Home from './features/home/pages/Home';
import ChangePassword from './features/profile/pages/ChangePassword';
import Profile from './features/profile/pages/Profile';
import ProfileInfo from './features/profile/pages/ProfileInfo';
import NotFound from './layouts/NotFound';
import Categories from './pages/Categories/Categories';
import Currencies from './pages/Currencies/Currencies';
import Transactions from './pages/Transactions/Transactions';
import Wallets from './pages/Wallets/Wallets';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/wallets' element={<Wallets />} />
                    <Route path='/currencies' element={<Currencies />} />
                    <Route path='/transactions' element={<Transactions />} />
                    <Route path='/profile' element={<Profile />}>
                        <Route index element={<ProfileInfo />} />
                        <Route path='change-password' element={<ChangePassword />} />
                    </Route>
                    <Route path='/categories' element={<Categories />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
            <Toaster toastOptions={{ style: { color: 'white', background: '#23303c', fontSize: '20px' } }} />
        </AuthProvider>
    );
}
