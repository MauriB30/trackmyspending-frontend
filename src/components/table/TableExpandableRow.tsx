import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import type { SubColumns } from './tableTypes';

interface Props<T> {
    item: T & { id: number };
    subColumn: SubColumns<T>;
}

export default function TableExpandableRow<T>({ item, subColumn }: Props<T>) {
    const items = item[subColumn.arrayKey];
    const columns = subColumn.subKeys;
    const subItems = Array.isArray(items) ? items : [];

    return (
        <>
            {subItems.map((item) => (
                <tr key={item.id} className='bg-background border-secondaryFont border-b text-xl'>
                    {columns.map((column) => (
                        <td className={column.className}>{String(item[column.key])}</td>
                    ))}
                    <td className='space-x-32 py-1 text-center'>
                        <button className='cursor-pointer rounded-lg border border-green-500 px-1 py-1'>
                            <EditIcon width='20' height='20' color='green' />
                        </button>
                        <button className='cursor-pointer rounded-lg border border-red-500 px-1 py-1'>
                            <TrashIcon width='20' height='20' color='red' />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
