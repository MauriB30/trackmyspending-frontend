import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { Month } from './calendarTypes';

interface Props {
    handleSelectMonth: (monthId: number) => void;
    setIsOpenMonth: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenYear: React.Dispatch<React.SetStateAction<boolean>>;
    month: Month;
    year: number;
    monthButtonRef: React.RefObject<null>;
    yearButtonRef: React.RefObject<null>;
}

export default function CalendarHeader({ handleSelectMonth, setIsOpenMonth, setIsOpenYear, month, year, monthButtonRef, yearButtonRef }: Props) {
    return (
        <div className='calendarHeader flex justify-between'>
            <div className='flex gap-2'>
                <button className='cursor-pointer' onClick={() => handleSelectMonth(month.id - 1)}>
                    <KeyboardArrowLeftIcon width='15' />
                </button>
                <span
                    ref={monthButtonRef}
                    onClick={() => setIsOpenMonth((prev) => !prev)}
                    className='hover:text-buttonActive w-20 cursor-pointer text-center text-white'
                >
                    {month.name}
                </span>
                <button onClick={() => handleSelectMonth(month.id + 1)} className='hover:text-buttonActive cursor-pointer'>
                    <KeyboardArrowRightIcon width='15' />
                </button>
            </div>
            <span ref={yearButtonRef} onClick={() => setIsOpenYear((prev) => !prev)} className='cursor-pointer'>
                {year}
            </span>
        </div>
    );
}
