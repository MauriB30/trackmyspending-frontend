import { zodResolver } from '@hookform/resolvers/zod';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import Button from '../../../components/Button';
import FormField from '../../../components/form/FormField';
import { AuthContext } from '../../../context/AuthContext';
import AuthTabs from '../components/AuthTabs';

const registerSchema = z
    .object({
        name: z.string().nonempty('El nombre es requerido').trim(),
        email: z.email('Email invalido').toLowerCase(),
        password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.').trim(),
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
        formState: { isSubmitting, errors },
    } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

    async function handleRegisterSubmit(formData: RegisterType) {
        const { name, email, password } = formData;

        const { message, success } = await registerUser(name, email, password);

        if (!success) {
            setServerError(message);
        }

        toast.success(message);
    }

    return (
        <form className='flex w-full max-w-[500px] flex-col gap-5' onSubmit={handleSubmit(handleRegisterSubmit)}>
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
            <Button type='submit' className='flex items-center justify-center'>
                {isSubmitting ? <CircularProgress size={24} color='inherit' /> : 'Acceder'}
            </Button>

            {serverError && <p className='text-error text-center'>{serverError}</p>}
        </form>
    );
}
