import type { RefObject } from 'react';
import { getYearsAround } from './calendarHelpers';

interface Props {
    yearMenuRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    selectedMonth: number;
    onSelect: (year: number, monthId: number) => void;
}

const actualYear = new Date().getFullYear();
const yearsAround = getYearsAround(actualYear);

export default function YearsDropdown({ yearMenuRef, isOpen, onSelect, selectedMonth }: Props) {
    console.log('render yearsDropdown');
    console.log(yearsAround);

    return (
        <>
            {isOpen && (
                <div
                    ref={yearMenuRef}
                    className={`absolute left-1 grid w-[300px] grid-cols-3 gap-2 rounded border border-slate-700/50 bg-slate-800/95 p-1 text-white shadow-lg backdrop-blur-sm transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                >
                    {yearsAround.map((yearAround) => (
                        <button
                            key={yearAround.id}
                            onClick={() => onSelect(yearAround.year, selectedMonth)}
                            className={`hover:text-buttonActive cursor-pointer rounded text-center ${
                                yearAround.year === actualYear ? 'bg-buttonActive hover:text-white' : ''
                            }`}
                        >
                            {yearAround.year}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
