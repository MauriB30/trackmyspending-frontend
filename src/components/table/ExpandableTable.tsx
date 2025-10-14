import { useState } from 'react';

import { useForm, type FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import Pagination from './Pagination';
import PaginationSelector from './PaginationSelector';
import TableContent from './TableContent';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableInputRow from './TableInputRow';
import type { TableProps } from './tableTypes';

export default function ExpandableTable<T extends FieldValues & { id: number }, U extends FieldValues = Record<string, unknown>>({
    data,
    head,
    headers,
    columns,
    subColumn,
    inputs,
    expandableInputs,
    showActions,
    addItem,
    addSubItem,
    updateData,
    setQuery,
    deleteItem,
    isExpandable,
    userId,
}: TableProps<T, U>) {
    const [isCreating, setIsCreating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startDataIndex = (currentPage - 1) * itemsPerPage;
    const endDataIndex = currentPage * itemsPerPage;
    const currentData = data.slice(startDataIndex, endDataIndex);

    const { register, handleSubmit, reset } = useForm<T>();
    const { register: registerSubItem, handleSubmit: handleSubmitSubItem } = useForm<U>();

    async function handleAddItem(formData: T) {
        console.log('formData desde la tabla: ', formData);
        const payload = userId ? { ...formData, userId } : formData;
        const { message, success, newData } = await addItem(payload);

        if (success && newData) {
            toast.success(message);
            updateData((prev) => [...prev, newData]);
            setIsCreating(false);
        } else {
            toast.error(message);
        }

        reset();
    }

    async function handleAddSubItem(formData: U) {
        console.log('formData desde la tabla subItem: ', formData);

        if (addSubItem) {
            const { success, message, newData } = await addSubItem(formData);

            if (success && newData) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }

    async function handleDelete(id: number) {
        const { message, success } = await deleteItem(id);

        if (success) {
            toast.success(message);
            updateData((prev) => prev.filter((category) => category.id !== id));
            setIsCreating(false);
        } else {
            toast.error(message);
        }
    }

    return (
        <div className='bg-secondary relative flex w-full flex-col gap-5 p-5'>
            <TableHeader
                title={head.title}
                textButton={head.textButton}
                openInput={setIsCreating}
                setQuery={setQuery}
                dualButtons={head.dualButtons}
                addItem={handleSubmit(addItem)}
                isCreating={isCreating}
            />

            <table>
                <TableHead headers={headers} />
                <tbody className='text-secondaryFont'>
                    <TableInputRow
                        isCreating={isCreating}
                        closeInput={setIsCreating}
                        inputs={inputs}
                        register={register}
                        onSubmit={handleSubmit(handleAddItem)}
                        showActions={showActions}
                    />
                    <TableContent
                        showActions={showActions}
                        data={currentData}
                        deleteItem={handleDelete}
                        isExpandable={isExpandable}
                        expandableInputs={expandableInputs}
                        columns={columns}
                        subColumn={subColumn}
                        register={registerSubItem}
                        addSubItem={handleSubmitSubItem(handleAddSubItem)}
                    />
                </tbody>
            </table>

            <div className='text-secondaryFont flex items-center justify-between text-2xl'>
                <Pagination currentPage={currentPage} totalItems={data.length} itemsPerPage={itemsPerPage} changePage={setCurrentPage} />
                <PaginationSelector />
            </div>
        </div>
    );
}
