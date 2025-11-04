import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useRef, useState } from 'react';
import Input from '../../../components/Input';
import useClickOutside from '../../../hooks/useClickOutside';
import Calendar from './calendar/Calendar';

function formatDate(day: number, month: number, year: number) {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(day)}/${pad(month)}/${year}`;
}

export default function DatePicker() {
    const date = new Date();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [today, setToday] = useState({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    });

    const calendarRef = useRef(null);
    const calendarTriggerRef = useRef(null);
    useClickOutside(calendarRef, () => setOpenCalendar(false), calendarTriggerRef);

    return (
        <div className='text-secondaryFont relative w-full cursor-pointer rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2'>
            <div className='flex' ref={calendarTriggerRef} onClick={() => setOpenCalendar((prev) => !prev)}>
                <Input
                    placeholder='Ingrese fecha'
                    className='cursor-pointer border-none bg-transparent text-white'
                    value={formatDate(today.day, today.month, today.year)}
                    readOnly
                />
                <span>
                    <CalendarMonthOutlinedIcon />
                </span>
            </div>

            {openCalendar && (
                <div className='absolute top-12 right-0 z-10' ref={calendarRef}>
                    <Calendar today={today} setToday={setToday} setOpenCalendar={setOpenCalendar} />
                </div>
            )}
        </div>
    );
}
