import type { RefObject } from 'react';

interface Props {
    ref: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    months: { id: number; name: string }[];
    handleSelectMonth: (monthId: number) => void;
}

export default function MonthsDropdown({ ref, isOpen, months, handleSelectMonth }: Props) {
    return (
        <>
            {isOpen && (
                <div ref={ref} className='bg-secondary absolute left-1 grid w-[300px] grid-cols-3 gap-2 rounded p-1'>
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
