import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import DatePicker from '../../features/home/components/DatePicker';
import Button from '../Button';
import Input from '../Input';
import SearchDropdown from '../shared/SearchDropdown';
import type { InputField } from './tableTypes';

type Props<T extends FieldValues> = {
    isCreating: boolean;
    closeInput: (value: boolean) => void;
    onSubmit: () => void;
    inputs: InputField[];
    register: UseFormRegister<T>;
    showActions: boolean;
};

export default function TableInputRow<T extends FieldValues>({ register, isCreating, closeInput, onSubmit, inputs, showActions }: Props<T>) {
    return (
        <>
            {isCreating ? (
                <tr className={`border-b ${inputs.length > 5 ? 'text-base' : ''}`}>
                    {inputs.map((input) => (
                        <td key={input.name} className={input.tdClassName || 'py-5'}>
                            {input.type === 'date' ? (
                                <DatePicker />
                            ) : input.type === 'select' ? (
                                <SearchDropdown options={input.options || []} />
                            ) : (
                                <Input
                                    {...register(input.name as Path<T>)}
                                    type={input.type || 'text'}
                                    maxLength={input.maxLength}
                                    placeholder={input.placeholder}
                                    className='py-2 pl-7'
                                />
                            )}
                        </td>
                    ))}
                    {showActions && (
                        <td className='space-x-3 text-center text-white'>
                            <Button onClick={onSubmit} type='submit'>
                                Guardar
                            </Button>
                            <Button type='button' variant='danger' onClick={() => closeInput(false)}>
                                Cancelar
                            </Button>
                        </td>
                    )}
                </tr>
            ) : null}
        </>
    );
}
