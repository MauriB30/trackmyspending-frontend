import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // 👈 Para Gastos
import WalletIcon from '@mui/icons-material/Wallet';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const links = [
    { to: '/', label: 'Inicio', icon: HomeIcon },
    { to: '/transactions', label: 'Gastos', icon: ReceiptLongIcon },
    { to: '/wallets', label: 'Billeteras', icon: WalletIcon },
    { to: '/currencies', label: 'Monedas', icon: CurrencyExchangeIcon },
    { to: '/categories', label: 'Categorias', icon: WorkspacesIcon },
];

export default function Sidebar() {
    const { logout } = useContext(AuthContext);

    return (
        <aside className='text-secondaryFont flex flex-col justify-between p-5'>
            <nav className='space-y-8'>
                <ul className='space-y-4'>
                    {links.map((link) => (
                        <li key={link.label}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) => `flex items-center gap-3 ${isActive ? 'text-white' : 'text-secondaryFont'}`}
                            >
                                <link.icon sx={{ color: 'inherit' }} />
                                <span>{link.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='space-y-4'>
                <NavLink
                    to='/profile'
                    className={({ isActive }) => `flex cursor-pointer items-center gap-3 ${isActive ? 'text-white' : 'text-secondaryFont'}`}
                >
                    <PersonIcon />
                    <span>Usuario</span>
                </NavLink>

                <button title='Cerrar sesión' className='flex cursor-pointer items-center gap-3' onClick={logout}>
                    <LogoutIcon />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}
