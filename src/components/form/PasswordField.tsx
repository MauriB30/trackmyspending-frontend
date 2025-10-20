import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import Input from '../Input';

interface Props {
    placeholder: string;
    error?: string;
    register: UseFormRegisterReturn;
}

export default function PasswordField({ register, placeholder = '', error }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='relative'>
            <Input {...register} type={showPassword ? 'text' : 'password'} placeholder={placeholder} className='p-2' />
            {error && <p className='text-error text-sm'>{error}</p>}
            <button type='button' onClick={() => setShowPassword((prev) => !prev)} className='absolute top-2 right-5 cursor-pointer'>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
        </div>
    );
}
