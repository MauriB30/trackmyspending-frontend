import { zodResolver } from '@hookform/resolvers/zod';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import z from 'zod';
import Button from '../../../components/Button';
import CheckBox from '../../../components/CheckBox';
import FormField from '../../../components/form/FormField';
import PasswordField from '../../../components/form/PasswordField';
import { useAuth } from '../../../hooks/UseAuth';
import AuthTabs from '../components/AuthTabs';

const loginSchema = z.object({
    email: z.email('Email invalido').toLowerCase().max(255, 'El correo no puede exceder los 255 caracteres.'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.').trim(),
});

type LoginType = z.infer<typeof loginSchema>;

export default function Login() {
    const [serverError, setServerError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

    async function handleLoginSubmit(data: LoginType) {
        const error = await login(data.email, data.password, rememberMe);

        if (error) {
            setServerError(error);
            return;
        }

        navigate('/');
    }

    return (
        <form className='flex w-[300px] flex-col gap-3' onSubmit={handleSubmit(handleLoginSubmit)}>
            <AuthTabs />
            <FormField register={register('email')} error={errors.email?.message} placeholder='Email' type='email' />
            <PasswordField register={register('password')} error={errors.password?.message} placeholder='Contraseña' />

            <div className='flex gap-2'>
                <CheckBox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <p>Recuérdame</p>
            </div>
            <Button type='submit'>{isSubmitting ? <CircularProgress size={24} color='inherit' /> : 'Acceder'}</Button>

            <div className='flex flex-col gap-2'>
                {serverError && <p className='text-error text-center'>{serverError}</p>}
                <NavLink to='/forgot-password' className='mt-3 text-center'>
                    Olvidó su contraseña?
                </NavLink>
            </div>
        </form>
    );
}
