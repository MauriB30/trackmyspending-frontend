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
    useClickOutside(calendarRef, () => setOpenCalendar(false));

    return (
        <div ref={calendarRef} className='bg-terceary relative flex w-fit items-center gap-1 rounded-lg px-3 py-2 text-white'>
            <div className='flex'>
                <Input placeholder='Ingrese fecha' className='w-[120px]' value={formatDate(today.day, today.month, today.year)} readOnly />
                <span onClick={() => setOpenCalendar((prev) => !prev)} className='cursor-pointer'>
                    <CalendarMonthOutlinedIcon />
                </span>
            </div>
            {openCalendar && (
                <div className='absolute top-12 right-0'>
                    <Calendar today={today} setToday={setToday} setOpenCalendar={setOpenCalendar} />
                </div>
            )}
        </div>
    );
}
