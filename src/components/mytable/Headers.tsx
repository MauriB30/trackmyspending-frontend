// Headers.tsx
import React from 'react';
import SortIcon from '../icons/SortIcon';
import type { TableColumnProps } from './myTableTypes';

interface HeadersProps<T> {
    headers: TableColumnProps<T>[];
    isExpandable?: boolean;
    actions: boolean;
}

function Headers<T>({ headers, isExpandable, actions }: HeadersProps<T>) {
    // Memoizar el renderizado de los headers para evitar re-renders
    const renderedHeaders = React.useMemo(() => {
        return headers.map((header) => (
            <th key={header.label} className={`${header.position || ''}`}>
                {header.label}
                {header.sortable && (
                    <button className='ml-3 cursor-pointer align-middle'>
                        <SortIcon width='40' height='40' />
                    </button>
                )}
            </th>
        ));
    }, [headers]);

    // Memoizar el header expandible
    const expandableHeader = React.useMemo(() => {
        if (!isExpandable) return null;
        return <th className='w-[3%]'></th>;
    }, [isExpandable]);

    // Memoizar el header de acciones
    const actionsHeader = React.useMemo(() => {
        if (!actions) return null;
        return <th className='text-right'>Acccion</th>;
    }, [actions]);

    return (
        <thead className='bg-background border-secondaryFont border-b text-4xl'>
            <tr>
                {expandableHeader}
                {renderedHeaders}
                {actionsHeader}
            </tr>
        </thead>
    );
}

// Memoizar el componente para evitar re-renders cuando las props no cambian
export default React.memo(Headers) as typeof Headers;
