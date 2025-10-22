import { useMemo } from 'react';
import { getNextDays, getPreviousDays, isToday } from './calendarHelpers';
import type { Month } from './calendarTypes';

interface Props {
    selectedYear: number;
    selectedMonth: Month;
    handlePickDay: (day: number) => void;
}

export default function RenderDays({ selectedYear, selectedMonth, handlePickDay }: Props) {
    const previousDays = useMemo(() => getPreviousDays(selectedYear, selectedMonth.id), [selectedYear, selectedMonth]);
    const days = useMemo(() => Array.from({ length: selectedMonth.days }, (_, index) => index + 1), [selectedMonth]);
    const nextDays = getNextDays(selectedYear, selectedMonth.id);

    return (
        <ul className='grid grid-cols-7 gap-4'>
            {previousDays.map((day) => (
                <li key={`empty-${day}`} className='text-center text-gray-500'>
                    {day}
                </li>
            ))}

            {days.map((day) => (
                <li
                    key={day}
                    className={`hover:bg-buttonActive cursor-pointer rounded-full text-center text-white ${
                        isToday(day, selectedMonth.id, selectedYear) ? 'bg-buttonActive' : ''
                    }`}
                    onClick={() => handlePickDay(day)}
                >
                    {day}
                </li>
            ))}

            {nextDays.map((day) => (
                <li key={`empty-${day}`} className='text-center text-gray-500'>
                    {day}
                </li>
            ))}
        </ul>
    );
}
