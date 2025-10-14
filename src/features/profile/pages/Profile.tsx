import { Outlet } from 'react-router';

export default function Profile() {
    return (
        <div className='flex justify-center'>
            <Outlet />
        </div>
    );
}
