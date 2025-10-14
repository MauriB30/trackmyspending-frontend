import Button from '../Button';
import SearchIcon from '../icons/SearchIcon';
import Input from '../Input';
import type { HeadTable } from './tableTypes';

interface Props extends HeadTable {
    openInput: (value: boolean) => void;
    addItem: () => void;
    isCreating: boolean;
}

export default function TableHeader({ textButton, openInput, title, setQuery, dualButtons, isCreating, addItem }: Props) {
    return (
        <div className='flex items-center justify-between'>
            <h2 className='text-5xl'>{title}</h2>

            <div className='flex gap-5'>
                <div className='relative flex items-center'>
                    <Input placeholder='Buscar' onChange={(e) => setQuery(e.target.value)} className='py-2 pl-7' />
                    <span className='absolute right-5'>
                        <SearchIcon width='40' height='40' />
                    </span>
                </div>

                {dualButtons ? (
                    <div className='flex gap-5'>
                        {isCreating ? (
                            <>
                                <Button onClick={addItem}>Guardar</Button>
                                <Button onClick={() => openInput(false)}>Cancelar</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => openInput(true)}>Cargar gasto</Button>
                                <Button onClick={() => openInput(true)}>Cargar ingreso</Button>
                            </>
                        )}
                    </div>
                ) : (
                    <Button onClick={() => openInput(true)}>{textButton}</Button>
                )}
            </div>
        </div>
    );
}
