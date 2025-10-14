interface Props {
    title: string;
    value: number;
    isCurrency?: boolean;
    balance: 'positive' | 'negative' | 'default';
    isclickable?: boolean;
    isActive?: boolean;
}

const colors = {
    positive: 'text-green-500',
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
            className={`bg-background flex flex-col rounded-lg py-5 text-center ${textColor} ${isclickable ? 'cursor-pointer' : ''} ${isActive ? 'border-buttonActive border-2' : ''}`}
        >
            <span>{isCurrency ? `$${formatNumber(value)}` : formatNumber(value)}</span>
            <span>{title}</span>
        </div>
    );
}
