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

    const dropdownMonthRef = useRef(null);
    const dropdownMonthButtonRef = useRef(null);
    const dropdownYearRef = useRef(null);
    const dropdownYearButtonRef = useRef(null);

    useClickOutside(dropdownMonthRef, () => setIsOpenMonth(false), dropdownMonthButtonRef);
    useClickOutside(dropdownYearRef, () => setIsOpenYear(false), dropdownYearButtonRef);

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
                monthButtonRef={dropdownMonthButtonRef}
                yearButtonRef={dropdownYearButtonRef}
            />

            <hr className='' />

            <MonthsDropdown months={months} ref={dropdownMonthRef} isOpen={isOpenMonth} handleSelectMonth={handleSelectMonth} />
            <YearsDropdown containerRef={dropdownYearRef} isOpen={isOpenYear} selectedMonth={selectedMonth.id} onSelect={handleSelectYear} />
            <WeekDays />
            <RenderDays selectedYear={selectedYear} selectedMonth={selectedMonth} handlePickDay={handlePickDay} />
        </div>
    );
}
