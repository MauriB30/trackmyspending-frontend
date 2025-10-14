import React, { useCallback } from 'react';
import AddIcon from '../icons/AddIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import type { ActionType } from './myTableTypes';

interface ActionsProps {
    openInput?: () => void;
    deleteItem?: () => void;
    editItem?: () => void;
    showActions?: ActionType[];
}

function Actions({ openInput, deleteItem, editItem, showActions = ['add', 'delete', 'edit'] }: ActionsProps) {
    // Memoizar los handlers para evitar recreaciones
    const handleEdit = useCallback(() => {
        editItem?.();
    }, [editItem]);

    const handleDelete = useCallback(() => {
        deleteItem?.();
    }, [deleteItem]);

    const handleAdd = useCallback(() => {
        openInput?.();
    }, [openInput]);

    // Memoizar los botones para evitar re-renders
    const editButton = React.useMemo(() => {
        if (!showActions.includes('edit')) return null;

        return (
            <button onClick={handleEdit} className='cursor-pointer rounded-lg border border-green-500 px-1 py-1'>
                <EditIcon width='40' height='40' color='green' />
            </button>
        );
    }, [showActions, handleEdit]);

    const deleteButton = React.useMemo(() => {
        if (!showActions.includes('delete')) return null;

        return (
            <button onClick={handleDelete} className='cursor-pointer rounded-lg border border-red-500 px-1 py-1'>
                <TrashIcon width='40' height='40' color='red' />
            </button>
        );
    }, [showActions, handleDelete]);

    const addButton = React.useMemo(() => {
        if (!showActions.includes('add')) return null;

        return (
            <button onClick={handleAdd} className='cursor-pointer rounded-lg border border-blue-500 px-1 py-1'>
                <AddIcon width='40' height='40' color='#4E9ADC' />
            </button>
        );
    }, [showActions, handleAdd]);

    return (
        <td className='space-x-10 text-right'>
            {editButton}
            {deleteButton}
            {addButton}
        </td>
    );
}

// Memoizar el componente para evitar re-renders cuando las props no cambian
export default React.memo(Actions);
