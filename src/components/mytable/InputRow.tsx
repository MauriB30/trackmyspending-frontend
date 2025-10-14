import type { FieldValues, UseFormRegister } from 'react-hook-form';
import Button from '../Button';
import InputCell from './InputCell';
import type { TableInputProp } from './myTableTypes';

interface InputRowProps<T extends FieldValues> {
    inputColumns: TableInputProp<T>[];
    isExpandible?: boolean;
    closeInputRow: () => void;
    addItem: () => void;
    register: UseFormRegister<T>;
}

export default function InputRow<T extends FieldValues>({ inputColumns, isExpandible, closeInputRow, addItem, register }: InputRowProps<T>) {
    console.log('RENDER INPUT ROW');

    return (
        <tr className={`border-b ${inputColumns.length > 5 ? 'text-base' : ''}`}>
            <td></td>

            {inputColumns.map((input) => (
                <InputCell key={String(input.accessor)} input={input} register={register} />
            ))}

            {isExpandible && (
                <td className='text-right'>
                    <Button onClick={addItem} type='submit'>
                        Guardar
                    </Button>
                    <Button onClick={closeInputRow} type='button' variant='danger'>
                        Cancelar
                    </Button>
                </td>
            )}
        </tr>
    );
}
