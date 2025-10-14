import { Fragment, useState } from 'react';

import type { FieldValues, UseFormRegister } from 'react-hook-form';
import TableExpandableInputRow from './TableExpandableInputRow';
import TableExpandableRow from './TableExpandableRow';
import TableRow from './TableRow';
import type { Column, InputField, SubColumns } from './tableTypes';

interface Props<T extends { id: number }, U extends FieldValues> {
    data: T[];
    deleteItem: (id: number) => void;
    isExpandable: boolean;
    columns: Column<T>[];
    subColumn?: SubColumns<T>;
    expandableInputs?: InputField[];
    register: UseFormRegister<U>;
    addSubItem: () => void;
    showActions: boolean;
}

export default function TableContent<T extends { id: number }, U extends FieldValues>({
    data,
    isExpandable,
    expandableInputs,
    columns,
    subColumn,
    deleteItem,
    register,
    addSubItem,
    showActions,
}: Props<T, U>) {
    const [rowOpen, setRowOpen] = useState<{ [key: number]: { open: boolean; isCreating: boolean } }>({});

    function toggleRow(id: number) {
        setRowOpen((prev) => ({
            ...prev,
            [id]: { open: !prev[id]?.open, isCreating: false },
        }));
    }

    function toggleCreating(id: number) {
        setRowOpen((prev) => {
            const prevState = prev[id] ?? { open: false, isCreating: false };
            return {
                ...prev,
                [id]: {
                    open: true,
                    isCreating: !prevState.isCreating,
                },
            };
        });
    }

    return (
        <>
            {data.map((item) => (
                <Fragment key={item.id}>
                    {isExpandable && rowOpen[item.id]?.open && rowOpen[item.id].isCreating && (
                        <TableExpandableInputRow
                            item={item}
                            inputs={expandableInputs}
                            onCancel={() => toggleCreating(item.id)}
                            register={register}
                            onSubmit={addSubItem}
                            parentId={item.id}
                        />
                    )}
                    <TableRow
                        item={item}
                        isOpen={rowOpen[item.id]?.open}
                        onToggle={() => toggleRow(item.id)}
                        columns={columns}
                        isExpandable={isExpandable}
                        onToggleCreating={() => toggleCreating(item.id)}
                        onDelete={deleteItem}
                        showActions={showActions}
                    />

                    {isExpandable && rowOpen[item.id]?.open && subColumn && <TableExpandableRow subColumn={subColumn} item={item} />}
                </Fragment>
            ))}
        </>
    );
}
