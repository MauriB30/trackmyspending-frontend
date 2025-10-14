import type { FieldValues, UseFormRegister } from 'react-hook-form';
import Cell from './Cell';
import InputRow from './InputRow';
import type { TableColumnProps, TableInputProp } from './myTableTypes';

interface ExpandedRowProps<U extends FieldValues> {
    subItems: U[];
    subColumns: TableColumnProps<U>[];
    subInputsColumns: TableInputProp<U>[];
    isExpandableInputOpen: boolean;
    addSubItem: () => void;
    register: UseFormRegister<U>;
}

export default function ExpandedRows<U extends FieldValues>({
    subItems = [],
    subColumns,
    subInputsColumns,
    isExpandableInputOpen,
    register,
    addSubItem,
}: ExpandedRowProps<U>) {
    console.log('rendering expandedRow');
    console.log(addSubItem);

    return (
        <>
            {isExpandableInputOpen && (
                <InputRow
                    inputColumns={subInputsColumns}
                    addItem={addSubItem}
                    closeInputRow={() => console.log('cerrando input')}
                    register={register}
                    isExpandible
                />
            )}

            {subItems.map((subItem) => (
                <tr className='hover:bg-hover border-b'>
                    <td></td>
                    {subColumns.map((subColumn) => (
                        <Cell column={subColumn} item={subItem} />
                    ))}
                </tr>
            ))}
        </>
    );
}
