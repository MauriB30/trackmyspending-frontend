import React, { useCallback } from 'react';
import CollapseIcon from '../icons/CollapseIcon';
import ExpandIcon from '../icons/ExpandIcon';

interface RowProps {
    children: React.ReactNode;
    isExpandable?: boolean;
    numColumns: number;
    isExpanded?: boolean;
    handleToggleRow: () => void;
}

function Row({ isExpandable, isExpanded, numColumns, children, handleToggleRow }: RowProps) {
    // Memoizar el handler del click para evitar recreaciones
    const handleClick = useCallback(() => {
        handleToggleRow();
    }, [handleToggleRow]);

    // Memoizar las clases CSS para evitar recálculos
    const rowClasses = React.useMemo(() => {
        const baseClasses = 'hover:bg-hover border-b';
        const sizeClasses = numColumns > 5 ? 'text-2xl' : '';
        return `${baseClasses} ${sizeClasses}`.trim();
    }, [numColumns]);

    // Memoizar el icono para evitar re-renders
    const expandIcon = React.useMemo(() => {
        if (!isExpandable) return null;

        return (
            <td className='text-center'>
                <button onClick={handleClick} className='cursor-pointer'>
                    {isExpanded ? <CollapseIcon width='20' height='20' /> : <ExpandIcon width='20' height='20' />}
                </button>
            </td>
        );
    }, [isExpandable, isExpanded, handleClick]);

    return (
        <tr className={rowClasses}>
            {expandIcon}
            {children}
        </tr>
    );
}

// Memoizar el componente para evitar re-renders cuando las props no cambian
export default React.memo(Row);
