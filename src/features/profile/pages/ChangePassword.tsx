import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
        newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
        newPasswordConfirm: z.string().min(1, 'Debe confirmar la nueva contraseña'),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
        message: 'Las contraseñas no coinciden',
        path: ['newPasswordConfirm'],
    });

type changePasswordType = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<changePasswordType>({ resolver: zodResolver(changePasswordSchema) });

    return (
        <div className='bg-secondary w-full max-w-[900px] p-5'>
            <form className='space-y-5'>
                <div className='flex flex-col gap-2'>
                    <label>Contraseña Actual</label>
                    <Input {...register('currentPassword')} type='password' className='p-2' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Nueva contraseña</label>
                    <Input {...register('newPassword')} type='password' className='p-2' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Repita nueva contraseña</label>
                    <Input {...register('newPasswordConfirm')} type='password' className='p-2' />
                </div>
                <div className='mt-10 flex justify-center gap-10'>
                    <Button type='submit' children='Guardar' className='w-full' />
                    <Button onClick={() => navigate(-1)} type='button' children='Cancelar' variant='danger' className='w-full' />
                </div>
            </form>
        </div>
    );
}
