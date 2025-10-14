import { useEffect, useState } from 'react';

import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { apiGetCurrencies } from '../../services/currenciesServices';
import Button from '../Button';
import Input from '../Input';
import SearchDropdown from '../shared/SearchDropdown';
import type { InputField } from './tableTypes';

type Props<U extends FieldValues, T> = {
    item: T;
    inputs?: InputField[];
    onCancel: () => void;
    register: UseFormRegister<U>;
    parentId: number;
    onSubmit: () => void;
};

export default function TableExpandableInputRow<U extends FieldValues, T>({ inputs, onCancel, register, onSubmit, parentId }: Props<U, T>) {
    const [currencys, setCurrencies] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        apiGetCurrencies().then((data) => {
            setCurrencies(data);
        });
    }, []);

    return (
        <tr className='bg-background border-b text-xl'>
            <td className='py-2 pl-4'>
                <div className='flex items-center gap-5 px-10'>
                    {inputs?.map((input) =>
                        input.visible === false ? (
                            <Input
                                key={input.name}
                                {...register(input.name as Path<U>)}
                                type={input.type || 'text'}
                                value={parentId}
                                className='hidden'
                            />
                        ) : input.type === 'select' ? (
                            <SearchDropdown key={input.name} options={currencys} />
                        ) : (
                            <Input
                                key={input.name}
                                {...register(input.name as Path<U>)}
                                type={input.type || 'text'}
                                placeholder={input.placeholder}
                                className='w-[260px] px-3 py-1'
                            />
                        )
                    )}
                </div>
            </td>

            <td className='space-x-20 py-2 text-center whitespace-nowrap text-white'>
                <Button onClick={onSubmit} variant='primary'>
                    Guardar
                </Button>
                <Button onClick={onCancel} variant='danger'>
                    Cancelar
                </Button>
            </td>
        </tr>
    );
}
