import type { RefObject } from 'react';

interface Props {
    monthMenuRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    months: { id: number; name: string }[];
    handleSelectMonth: (monthId: number) => void;
}

export default function MonthsDropdown({ monthMenuRef, isOpen, months, handleSelectMonth }: Props) {
    return (
        <>
            {isOpen && (
                <div
                    ref={monthMenuRef}
                    className='absolute left-1 grid w-[300px] grid-cols-3 gap-2 rounded border border-slate-700/50 bg-slate-800/95 p-1 text-white shadow-lg backdrop-blur-sm'
                >
                    {months.map((month) => (
                        <span
                            key={month.id}
                            onClick={() => handleSelectMonth(month.id)}
                            className='hover:text-buttonActive cursor-pointer text-center'
                        >
                            {month.name}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}
