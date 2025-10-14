import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import useFilter from '../hooks/useFilter';

interface Option {
    id: number;
    name: string;
    symbol?: string;
}

interface Props {
    options: Option[];
}

export default function SearchDropdown({ options }: Props) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const filteredOptions = useFilter(options, query);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleToggle() {
        setIsOpen(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
        setQuery('');
    }

    function handleSelect(item: string) {
        setSelectedOption(item);
        setIsOpen(false);
        setQuery('');
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const searchTerm = event.target.value;
        setQuery(searchTerm);
    }

    useClickOutside(dropdownRef, () => setIsOpen(false), triggerRef);

    return (
        <div ref={dropdownRef} className='Selector relative flex w-[230px] flex-col gap-2'>
            <div ref={triggerRef} onClick={handleToggle} className='bg-terceary cursor-pointer rounded'>
                {isOpen ? (
                    <input
                        ref={inputRef}
                        type='search'
                        onChange={handleSearch}
                        value={query}
                        placeholder='Buscar'
                        className='bg-background w-full rounded px-4 py-1 outline-none'
                    />
                ) : (
                    <div className='flex justify-between px-5 py-1'>
                        <span>{selectedOption ? selectedOption : 'Selecciona una moneda'}</span>
                        <ArrowDropDownIcon />
                    </div>
                )}
            </div>

            <div className={`${isOpen ? 'absolute top-full mt-2' : 'hidden'} bg-terceary w-full space-y-3 rounded p-1 shadow-md`}>
                {filteredOptions.map((option: Option) => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.name)}
                        className='hover:bg-hover flex w-full cursor-pointer justify-between px-4'
                    >
                        <span className='max-w-[85%] overflow-hidden text-nowrap text-ellipsis' title={option.name}>
                            {option.name}
                        </span>
                        <span>{option.symbol}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
