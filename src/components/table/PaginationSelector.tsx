import { useState } from 'react';
import ArrowUpIcon from '../icons/ArrowUpIcon';

export default function PaginationSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const options = [5, 10, 20, 50];
    return (
        <div className='relative flex items-center gap-2 rounded-lg border px-3 py-2'>
            <p>5</p>
            <button onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
                <ArrowUpIcon width='15' height='15' />
            </button>
            {isOpen && (
                <div className='bg-secondary absolute right-0 bottom-15 w-full rounded-lg border p-2'>
                    <ul className='flex flex-col gap-2'>
                        {options.map((option) => (
                            <li key={option}>
                                <button className='w-full cursor-pointer text-left'>{option}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
