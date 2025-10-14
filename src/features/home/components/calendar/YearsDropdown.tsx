import type { RefObject } from 'react';
import { getYearsAround } from './calendarHelpers';

interface Props {
    containerRef: RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    selectedMonth: number;
    onSelect: (year: number, monthId: number) => void;
}

const actualYear = new Date().getFullYear();
const yearsAround = getYearsAround(actualYear);

export default function YearsDropdown({ containerRef, isOpen, onSelect, selectedMonth }: Props) {
    console.log('render yearsDropdown');

    return (
        <>
            {isOpen && (
                <div
                    ref={containerRef}
                    className={`bg-secondary absolute left-1 grid w-[300px] grid-cols-3 gap-2 rounded p-1 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
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
