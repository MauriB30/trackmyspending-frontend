import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const { user } = useContext(AuthContext);
    return (
        <header className='flex items-center justify-between p-5'>
            <h2 className='text-secondaryFont text-2xl'> {user?.name}</h2>
            <h1 className='text-3xl text-white'>Track my spending</h1>
        </header>
    );
}
