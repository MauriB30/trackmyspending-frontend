interface Props {
    title: string;
    value: number;
    isCurrency?: boolean;
    balance: 'positive' | 'negative' | 'default';
    isclickable?: boolean;
    isActive?: boolean;
}

const colors = {
    positive: 'text-emerald-400',
    negative: 'text-red-500',
    default: '',
};

function formatNumber(num: number) {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(num);
}

export default function SummaryCard({ title, value, isCurrency, balance, isclickable, isActive }: Props) {
    const textColor = colors[balance];

    return (
        <div
            className={`flex flex-col rounded-lg border py-5 text-center text-white ${isclickable ? 'cursor-pointer' : ''} ${isActive ? 'border-slate-600/50 bg-slate-700/50' : 'border-slate-700/50 bg-slate-800/30'}`}
        >
            <span className={`text-2xl font-bold ${textColor}`}>{isCurrency ? `$${formatNumber(value)}` : formatNumber(value)}</span>
            <span className='text-secondaryFont'>{title}</span>
        </div>
    );
}
