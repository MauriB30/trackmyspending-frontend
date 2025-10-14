import fondo from '../assets/images/fondo.png';

interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <main className='auth-section h-screen' style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <section className='grid h-full grid-cols-2 text-white'>
                <div className='flex flex-col items-center gap-10'>
                    <h2 className='mt-52 text-center text-6xl'>Track My Spending</h2>
                    <>{children}</>
                </div>
                <div></div>
            </section>
        </main>
    );
}
