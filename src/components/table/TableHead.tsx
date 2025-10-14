import SortIcon from '../icons/SortIcon';
import type { ColumnHeader } from './tableTypes';

interface Props {
    headers: ColumnHeader[];
}

export default function TableHead({ headers }: Props) {
    return (
        <thead className='bg-background border-secondaryFont border-b text-4xl'>
            <tr>
                {headers.map((header) => (
                    <th key={header.text} className={header.className} colSpan={header.colSpan}>
                        {header.text}
                        {header.sortable && (
                            <button className='ml-3 cursor-pointer align-middle'>
                                <SortIcon width='40' height='40' />
                            </button>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
