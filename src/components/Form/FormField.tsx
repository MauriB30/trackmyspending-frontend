import type React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import Input from '../Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    register: UseFormRegisterReturn;
}

export default function FormField({ register, type = 'text', placeholder = '', error, ...props }: Props) {
    return (
        <div className='relative'>
            <Input {...register} type={type} placeholder={placeholder} {...props} className='p-2' />
            {error && <p className='text-error text-sm'>{error}</p>}
        </div>
    );
}
