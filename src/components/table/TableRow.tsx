import AddIcon from '../icons/AddIcon';
import CollapseIcon from '../icons/CollapseIcon';
import EditIcon from '../icons/EditIcon';
import ExpandIcon from '../icons/ExpandIcon';
import TrashIcon from '../icons/TrashIcon';
import type { Column } from './tableTypes';

interface Props<T> {
    item: T & { id: number };
    isOpen: boolean;
    onToggle: () => void;
    onToggleCreating: () => void;
    onDelete: (id: number) => void;
    columns: Column<T>[];
    isExpandable?: boolean;
    showActions: boolean;
}

export default function TableRow<T>({ columns, isOpen, item, onToggle, onToggleCreating, isExpandable, showActions, onDelete }: Props<T>) {
    return (
        <tr className={`hover:bg-hover border-b ${columns.length > 5 ? 'text-2xl' : ''}`}>
            {columns.map((column) => (
                <td key={String(column.key)} className={column.className}>
                    {isExpandable && (
                        <button onClick={onToggle} className='mr-4 cursor-pointer'>
                            {isOpen ? <CollapseIcon width='20' height='20' /> : <ExpandIcon width='20' height='20' />}
                        </button>
                    )}
                    {String(item[column.key])}
                </td>
            ))}

            {showActions && (
                <td className='space-x-10 py-4 text-center'>
                    <button className='cursor-pointer rounded-lg border border-green-500 px-1 py-1'>
                        <EditIcon width='40' height='40' color='green' />
                    </button>
                    <button onClick={() => onDelete(item.id)} className='cursor-pointer rounded-lg border border-red-500 px-1 py-1'>
                        <TrashIcon width='40' height='40' color='red' />
                    </button>
                    {isExpandable && (
                        <button onClick={onToggleCreating} className='cursor-pointer rounded-lg border border-blue-500 px-1 py-1'>
                            <AddIcon width='40' height='40' color='#4E9ADC' />
                        </button>
                    )}
                </td>
            )}
        </tr>
    );
}
