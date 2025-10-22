import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const [isBarOpen, setIsBarOpen] = React.useState(false);

    return (
        <div className='App flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
            <Sidebar isBarOpen={isBarOpen} closeBar={() => setIsBarOpen(false)} />
            <div className='flex flex-1 flex-col'>
                <Header openBar={() => setIsBarOpen(true)} />
                <main className='flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white'>{children}</main>
            </div>
        </div>
    );
}
