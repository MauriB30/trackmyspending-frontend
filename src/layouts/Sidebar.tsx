import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import WalletIcon from '@mui/icons-material/Wallet';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const mainLinks = [
    { to: '/', label: 'Inicio', icon: HomeIcon },
    { to: '/transactions', label: 'Gastos', icon: ReceiptLongIcon },
    { to: '/wallets', label: 'Billeteras', icon: WalletIcon },
    { to: '/currencies', label: 'Monedas', icon: CurrencyExchangeIcon },
    { to: '/categories', label: 'Categorías', icon: WorkspacesIcon },
];

interface SidebarProps {
    isBarOpen: boolean;
    closeBar: () => void;
}

const linkBaseStyles = 'flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-slate-700/50';

export default function Sidebar({ isBarOpen, closeBar }: SidebarProps) {
    const { user, logout } = useContext(AuthContext);

    const sidebarClasses = `
        ${isBarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50
        sm:translate-x-0 sm:static sm:z-auto
        w-80 sm:w-auto min-h-screen
        text-secondaryFont
        border-r border-slate-700/50 bg-slate-800/50
        p-5 backdrop-blur-xl
        transition-transform duration-300 ease-in-out
    `;

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `${linkBaseStyles} ${isActive ? 'text-white font-semibold bg-slate-700/70' : ''}`;

    return (
        <div className={sidebarClasses}>
            <aside className='flex h-full flex-col'>
                <div className='mb-10 flex items-center justify-between border-b border-slate-700/50 pt-2 pb-4'>
                    <p className='text-2xl font-bold text-white'> {user?.name || 'Invitado'}</p>
                    <button
                        onClick={closeBar}
                        className='cursor-pointer rounded-lg p-2 transition-colors duration-200 hover:bg-slate-700/50 sm:hidden'
                        aria-label='Cerrar menú'
                    >
                        <CloseIcon sx={{ fontSize: 24 }} />
                    </button>
                </div>

                <div className='flex flex-grow flex-col justify-between'>
                    <nav className='space-y-2'>
                        <ul className='space-y-1'>
                            {mainLinks.map((link) => (
                                <li key={link.label}>
                                    <NavLink to={link.to} className={getNavLinkClass}>
                                        <link.icon sx={{ fontSize: 24 }} />
                                        <span>{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className='space-y-1 border-t border-slate-700/50 pt-4'>
                        <NavLink to='/profile ' className={getNavLinkClass}>
                            <PersonIcon />
                            <span>Usuario</span>
                        </NavLink>

                        <button title='Cerrar sesión' className={`${linkBaseStyles} w-full cursor-pointer text-left`} onClick={logout}>
                            <LogoutIcon sx={{ fontSize: 24 }} />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
