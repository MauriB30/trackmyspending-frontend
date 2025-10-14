import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import DatePicker from '../../features/home/components/DatePicker';
import Input from '../Input';
import SearchDropdown from '../shared/SearchDropdown';
import type { TableInputProp } from './myTableTypes';

interface InputCellProps<T extends FieldValues> {
    input: TableInputProp<T>;
    register: UseFormRegister<T>;
}

export default function InputCell<T extends FieldValues>({ input, register }: InputCellProps<T>) {
    return (
        <td className={`${input.position || 'text-center'}`}>
            {input.inputType === 'date' ? (
                <DatePicker />
            ) : input.inputType === 'select' ? (
                <SearchDropdown options={input.options || []} />
            ) : (
                <Input {...register(input.accessor as Path<T>)} type={input.inputType || 'text'} placeholder={input.label} className='py-2 pl-7' />
            )}
        </td>
    );
}
