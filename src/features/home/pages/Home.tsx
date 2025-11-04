import { useEffect, useState } from 'react';
import DatePicker from '../components/DatePicker';
import PieChartContainer from '../components/PieChartContainer';
import PieLegend from '../components/PieLegend';
import SummaryCard from '../components/SummaryCard';
import { calculateTotalExpenses, mapChartData } from '../utils/chartUtils';

export interface IExpense {
    id: number;
    category: string;
    amount: number;
    subcategories?: Omit<IExpense, 'subcategories'>[];
}

export interface PieChartProps {
    id: number;
    value: number;
    label: string;
    color: string;
}

const data = [
    {
        id: 0,
        category: 'Transporte',
        amount: 3500,
        subcategories: [
            { id: 0, category: 'Nafta', amount: 2000 },
            { id: 1, category: 'Subte', amount: 1000 },
            { id: 2, category: 'Taxi', amount: 500 },
        ],
    },
    {
        id: 1,
        category: 'Hogar',
        amount: 4000,
        subcategories: [
            { id: 3, category: 'Alquiler', amount: 3000 },
            { id: 4, category: 'Luz', amount: 500 },
            { id: 5, category: 'Internet', amount: 500 },
        ],
    },
    {
        id: 2,
        category: 'Streaming',
        amount: 5000,
        subcategories: [
            { id: 6, category: 'Netflix', amount: 2500 },
            { id: 7, category: 'Spotify', amount: 1500 },
            { id: 8, category: 'HBO', amount: 1000 },
        ],
    },
    {
        id: 3,
        category: 'Comida',
        amount: 10000,
        subcategories: [
            { id: 9, category: 'Supermercado', amount: 6000 },
            { id: 10, category: 'Delivery', amount: 3000 },
            { id: 11, category: 'Cafetería', amount: 1000 },
        ],
    },
    {
        id: 4,
        category: 'Indumentaria',
        amount: 2450,
        subcategories: [
            { id: 12, category: 'Zapatillas', amount: 1000 },
            { id: 13, category: 'Camperas', amount: 800 },
            { id: 14, category: 'Pantalones', amount: 650 },
        ],
    },
    {
        id: 5,
        category: 'Salud',
        amount: 3000,
    },
    {
        id: 6,
        category: 'Educación',
        amount: 1500,
        subcategories: [
            { id: 15, category: 'Cursos Online', amount: 1000 },
            { id: 16, category: 'Libros', amount: 500 },
        ],
    },
];

export default function Home() {
    const [chartData, setChartData] = useState<PieChartProps[]>([]);
    const [categoryId, setCategoryid] = useState<number | undefined>(undefined);
    const totalExpenses = calculateTotalExpenses(data);

    function handleOpenLegend(id: number) {
        if (id === categoryId) {
            setCategoryid(undefined);
            return;
        }
        setCategoryid(id);
    }

    useEffect(() => {
        const mappedData = mapChartData(data, categoryId);
        setChartData(mappedData);
    }, [categoryId]);

    return (
        <div className='text-secondaryFont flex h-full flex-col gap-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
            <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <label>Desde:</label>
                <DatePicker />
                <label>Hasta:</label>
                <DatePicker />
            </div>

            <div className='grid gap-2 lg:grid-cols-2'>
                <SummaryCard title='Ingresos' value={500000} isCurrency balance='positive' isclickable={true} />
                <SummaryCard title='Gastos' value={totalExpenses} isCurrency balance='negative' isclickable={true} isActive={true} />
                <SummaryCard title='Balance' value={500000 - totalExpenses} isCurrency balance='default' />
                <SummaryCard title='Transacciones' value={231} balance='default' />
            </div>

            <div className='relative h-full items-center space-y-10 rounded-lg border border-slate-700/50 bg-slate-800/30 p-5'>
                <h2 className='text-center text-2xl lg:text-left'>Gastos Totales</h2>
                <div className='flex  flex-col items-center justify-center gap-5 sm:h-auto lg:flex-row'>
                    <PieChartContainer totalExpenses={totalExpenses} data={chartData} />
                    <PieLegend data={data} handleOpenLegend={handleOpenLegend} categoryId={categoryId} />
                </div>
            </div>
        </div>
    );
}
