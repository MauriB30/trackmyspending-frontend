import fondoOptimized from '../assets/images/fondowebp.webp';

interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <main
            className='auth-section h-screen'
            style={{ backgroundImage: `url(${fondoOptimized})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <section className='flex h-full flex-col items-center justify-center gap-20 px-10 text-white'>
                <h2 className='text-center text-6xl'>Track My Spending</h2>
                <>{children}</>
            </section>
        </main>
    );
}
