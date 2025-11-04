import { useRef, useState } from 'react';
import useClickOutside from '../../../../hooks/useClickOutside';
import CalendarHeader from './CalendarHeader';
import { getMonths } from './calendarHelpers';
import type { CalendarProps, Month } from './calendarTypes';
import MonthsDropdown from './MonthsDropdown';
import RenderDays from './RenderDays';
import WeekDays from './WeekDays';
import YearsDropdown from './YearsDropdown';

export default function Calendar({ today, setToday, setOpenCalendar }: CalendarProps) {
    const [selectedYear, setSelectedYear] = useState<number>(today.year);
    const months = getMonths(selectedYear);
    const [selectedMonth, setSelectedMonth] = useState<Month>(months[today.month - 1]);
    const [isOpenMonth, setIsOpenMonth] = useState(false);
    const [isOpenYear, setIsOpenYear] = useState(false);

    const monthMenuRef = useRef(null);
    const monthTriggerRef = useRef(null);
    const yearMenuRef = useRef(null);
    const yearTriggerRef = useRef(null);

    useClickOutside(monthMenuRef, () => setIsOpenMonth(false), monthTriggerRef);
    useClickOutside(yearMenuRef, () => setIsOpenYear(false), yearTriggerRef);

    function handleSelectMonth(monthId: number) {
        if (monthId === -1) {
            setSelectedYear((prev) => prev - 1);
            const newMonthId = 11;
            const newMonths = getMonths(selectedYear - 1);
            setSelectedMonth(newMonths[newMonthId]);
            setToday((prev) => ({ ...prev, month: 12, year: selectedYear - 1 }));
        }

        if (monthId === 12) {
            setSelectedYear((prev) => prev + 1);
            const newMonthId = 0;
            const newMonths = getMonths(selectedYear + 1);
            setSelectedMonth(newMonths[newMonthId]);
            setToday((prev) => ({ ...prev, month: 1, year: selectedYear + 1 }));
        }

        const month = months.find((month) => month.id === monthId);
        if (month) {
            setSelectedMonth(month);
            setToday((prev) => ({ ...prev, month: monthId + 1 }));
            setIsOpenMonth(false);
        }
    }

    function handleSelectYear(year: number, monthId: number) {
        setSelectedYear(() => {
            const newMonths = getMonths(year);
            setSelectedMonth(newMonths[monthId]);
            return year;
        });
        setToday((prev) => ({ ...prev, year }));

        setIsOpenYear(false);
    }

    function handlePickDay(selectedDay: number) {
        setToday((prev) => ({ ...prev, day: selectedDay }));
        setOpenCalendar(false);
    }

    return (
        <div className='relative space-y-5 rounded border border-slate-700/50 bg-slate-800 p-3 backdrop-blur-xl'>
            <CalendarHeader
                handleSelectMonth={handleSelectMonth}
                setIsOpenMonth={setIsOpenMonth}
                setIsOpenYear={setIsOpenYear}
                month={selectedMonth}
                year={selectedYear}
                monthTriggerRef={monthTriggerRef}
                yearTriggerRef={yearTriggerRef}
            />

            <hr className='' />

            <MonthsDropdown months={months} monthMenuRef={monthMenuRef} isOpen={isOpenMonth} handleSelectMonth={handleSelectMonth} />
            <YearsDropdown yearMenuRef={yearMenuRef} isOpen={isOpenYear} selectedMonth={selectedMonth.id} onSelect={handleSelectYear} />
            <WeekDays />
            <RenderDays selectedYear={selectedYear} selectedMonth={selectedMonth} handlePickDay={handlePickDay} />
        </div>
    );
}
