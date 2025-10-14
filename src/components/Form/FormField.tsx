import type React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import Input from '../Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    register: UseFormRegisterReturn;
}

export default function FormField({ register, label, type = 'text', placeholder = '', error, ...props }: Props) {
    return (
        <div className='relative'>
            {label && <label className='mb-4'>{label}</label>}
            <Input {...register} type={type} placeholder={placeholder} {...props} className='p-2' />
            {error && <p className='text-error text-sm'>{error}</p>}
        </div>
    );
}
