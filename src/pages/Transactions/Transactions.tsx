import { useState } from 'react';

export default function Transactions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <section className='flex h-full justify-center'>
            {loading ? (
                <div className='flex h-full items-center justify-center'>Cargando...</div>
            ) : error ? (
                <div className='flex h-full items-center justify-center'>{error}</div>
            ) : (
                <p>Gastos</p>
            )}
        </section>
    );
}
