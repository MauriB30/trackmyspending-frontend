import Button from '../Button';
import SearchIcon from '../icons/SearchIcon';
import Input from '../Input';
import type { TableToolbarProps } from './myTableTypes';

interface Props extends TableToolbarProps {
    IsRowInputOpen: boolean;
    setIsRowInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addItem?: () => void;
}

export default function TableToolbar({
    title,
    textButton,
    dualButtons,
    IsRowInputOpen,

    setIsRowInputOpen,
}: Props) {
    return (
        <div className='flex items-center justify-between'>
            <h2 className='text-5xl'>{title}</h2>

            <div className='flex gap-5'>
                <div className='relative flex items-center'>
                    <Input placeholder='Buscar' className='py-2 pl-7' />
                    <span className='absolute right-5'>
                        <SearchIcon width='40' height='40' />
                    </span>
                </div>

                {dualButtons ? (
                    <div className='flex gap-5'>
                        {IsRowInputOpen ? (
                            <>
                                <Button>Guardar</Button>
                                <Button onClick={() => setIsRowInputOpen(false)}>Cancelar</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setIsRowInputOpen(true)}>Cargar gasto</Button>
                                <Button onClick={() => setIsRowInputOpen(true)}>Cargar ingreso</Button>
                            </>
                        )}
                    </div>
                ) : (
                    <Button onClick={() => setIsRowInputOpen(true)}>{textButton}</Button>
                )}
            </div>
        </div>
    );
}
