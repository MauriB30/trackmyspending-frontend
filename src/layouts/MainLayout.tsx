import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    return (
        <div className='App bg-secondary flex h-screen flex-col'>
            <Header />
            <main className='flex flex-1'>
                <Sidebar />
                <section className='bg-background flex-1 p-5 text-white'>{children}</section>
            </main>
        </div>
    );
}
