import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Button from '../../../components/Button';
import FormField from '../../../components/Form/FormField';
import { AuthContext } from '../../../context/AuthContext';
import AuthTabs from '../components/AuthTabs';

const registerSchema = z
    .object({
        name: z.string().nonempty('El nombre es requerido').trim(),
        email: z.email('Email invalido').toLowerCase(),
        password: z.string().min(6, 'La contraseña debe tener al menos 8 caracteres.').trim(),
        repeatPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: 'Las contraseñas no coinciden.',
        path: ['repeatPassword'],
    });

type RegisterType = z.infer<typeof registerSchema>;

export default function Register() {
    const [serverError, setServerError] = useState('');
    const { register: registerUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

    async function handleRegisterSubmit(data: RegisterType) {
        const { message, success } = await registerUser(data.name, data.email, data.password);
        
        if (!success) {
            setServerError(message);
        }
    }

    return (
        <form className='flex w-[300px] flex-col gap-3' onSubmit={handleSubmit(handleRegisterSubmit)}>
            <AuthTabs />
            <FormField register={register('name')} error={errors.name?.message} placeholder='Nombre' />
            <FormField register={register('email')} error={errors.email?.message} placeholder='Email' type='email' />
            <FormField register={register('password')} error={errors.password?.message} placeholder='Contraseña' type='password' />
            <FormField
                register={register('repeatPassword')}
                error={errors.repeatPassword?.message}
                placeholder='Repita su contraseña'
                type='password'
            />
            <Button type='submit'>Crear</Button>

            {serverError && <p className='text-error text-center'>{serverError}</p>}
        </form>
    );
}
