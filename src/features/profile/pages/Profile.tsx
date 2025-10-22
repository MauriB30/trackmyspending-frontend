import { Outlet } from 'react-router';

export default function Profile() {
    return (
        <section className='flex justify-center'>
            <Outlet />
        </section>
    );
}
