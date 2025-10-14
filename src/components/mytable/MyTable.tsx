import React, { useState } from 'react';

import toast from 'react-hot-toast';
import Pagination from '../table/Pagination';
import PaginationSelector from '../table/PaginationSelector';
import Actions from './Actions';
import Cell from './Cell';
import ExpandedRows from './ExpandedRows';
import Headers from './Headers';
import InputRow from './InputRow';

import { useForm, type FieldValues } from 'react-hook-form';
import Row from './Row';
import TableToolbar from './TableToolbar';
import type { MyTableProps } from './myTableTypes';

export default function MyTable<T extends FieldValues, U extends FieldValues>({
    data,
    subData = {},
    config,
    expandableConfig,
    onAdd,
    onSubAdd,
    fetchSubItems,
}: MyTableProps<T, U>) {
    const isExpandable = Boolean(expandableConfig);
    const [isRowInputOpen, setIsRowInputOpen] = useState(false);
    const [isRowExpanded, setIsRowExpanded] = useState<{ [key: number]: { open: boolean; isCreating: boolean } }>({});
    const { register, handleSubmit } = useForm<T>();
    const { register: registerSub, handleSubmit: handleSubmitSub } = useForm<U>();

    async function handleAddItem(formData: T) {
        const { success, message } = await onAdd(formData);

        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    async function handleAddSubItem(formData: U, parentId: number) {
        console.log(formData, parentId);
        if (onSubAdd) {
            const { success, message } = await onSubAdd(formData, parentId);

            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }

    function handleToggleRow(id: number) {
        if (!isRowExpanded[id]?.open && !subData?.[id] && fetchSubItems) {
            fetchSubItems(id);
        }

        setIsRowExpanded((prev) => ({
            ...prev,
            [id]: { open: !prev[id]?.open, isCreating: false },
        }));
    }

    function handleOpenExpandableInput(id: number) {
        setIsRowExpanded((prev) => ({
            ...prev,
            [id]: { open: true, isCreating: true },
        }));
    }

    return (
        <div className='bg-secondary relative flex w-full flex-col gap-5 p-5'>
            <TableToolbar
                IsRowInputOpen={isRowInputOpen}
                setIsRowInputOpen={setIsRowInputOpen}
                title={config.toolbar.title}
                textButton={config.toolbar.textButton}
            />
            <div className='flex-1'>
                <table className='w-full table-fixed'>
                    <Headers headers={config.columns} isExpandable={isExpandable} actions={!!config.actions} />
                    <tbody className='text-secondaryFont'>
                        {isRowInputOpen && (
                            <InputRow
                                inputColumns={config.inputsRow}
                                isExpandible={isExpandable}
                                addItem={handleSubmit(handleAddItem)}
                                register={register}
                                closeInputRow={() => setIsRowInputOpen(false)}
                            />
                        )}
                        {data.map((item) => (
                            <React.Fragment key={item.id}>
                                <Row
                                    numColumns={config.columns.length}
                                    isExpandable={isExpandable}
                                    handleToggleRow={() => handleToggleRow(item.id)}
                                    isExpanded={isRowExpanded[item.id]?.open}
                                >
                                    {config.columns.map((column) => (
                                        <Cell key={String(column.accessor)} column={column} item={item} />
                                    ))}
                                    <Actions openInput={() => handleOpenExpandableInput(item.id)} showActions={config.actions} />
                                </Row>
                                {expandableConfig && isRowExpanded[item.id]?.open && (
                                    <ExpandedRows
                                        subItems={subData[item.id]}
                                        subColumns={expandableConfig.subColumns}
                                        subInputsColumns={expandableConfig.subInputsRow}
                                        isExpandableInputOpen={isRowExpanded[item.id]?.isCreating}
                                        addSubItem={handleSubmitSub((formData: U) => handleAddSubItem(formData, item.id))}
                                        register={registerSub}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='text-secondaryFont flex items-center justify-between text-2xl'>
                <Pagination />
                <PaginationSelector />
            </div>
        </div>
    );
}
