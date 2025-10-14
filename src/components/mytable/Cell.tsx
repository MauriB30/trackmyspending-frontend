import React from 'react';
import type { TableColumnProps } from './myTableTypes';

interface CellProps<T> {
    item: T;
    column: TableColumnProps<T>;
}

function Cell<T>({ column, item }: CellProps<T>) {
    const position = column.position || 'text-center';
    const value = item[column.accessor as keyof T];

    // Memoizar el valor renderizado para evitar re-renders innecesarios
    const displayValue = React.useMemo(() => {
        return String(value ?? '');
    }, [value]);

    return <td className={`${position} py-2`}>{displayValue}</td>;
}

// Memoizar el componente para evitar re-renders cuando las props no cambian
export default React.memo(Cell) as typeof Cell;
