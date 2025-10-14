import { NavLink } from 'react-router';

export default function AuthTabs() {
    return (
        <div className='tags-container flex justify-between'>
            <NavLink
                to='/login'
                className={({ isActive }) =>
                    `flex-1 rounded-l-lg border border-white/20 p-2 text-center ${isActive ? 'bg-background' : 'bg-buttonActive hover:bg-buttonHover'}`
                }
            >
                Ingreso
            </NavLink>
            <NavLink
                to='/register'
                className={({ isActive }) =>
                    `flex-1 rounded-r-lg border border-white/20 p-2 text-center text-nowrap ${isActive ? 'bg-background' : 'bg-buttonActive hover:bg-buttonHover'}`
                }
            >
                Crear cuenta
            </NavLink>
        </div>
    );
}
