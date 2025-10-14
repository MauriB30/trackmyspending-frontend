import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import Button from '../../../components/Button';
import FormField from '../../../components/Form/FormField';

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
        newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres'),
        newPasswordConfirm: z.string().min(6, 'Debe confirmar la nueva contraseña'),
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

    async function handleChangePassword(data: changePasswordType) {
        console.log(data);
    }

    return (
        <div className='bg-secondary w-full max-w-[900px] p-5'>
            <form className='space-y-5' onSubmit={handleSubmit(handleChangePassword)}>
                <FormField label='Contraseña actual' register={register('currentPassword')} type='password' error={errors.currentPassword?.message} />
                <FormField label='Nueva contraseña' register={register('newPassword')} type='password' error={errors.newPassword?.message} />
                <FormField
                    label='Repita nueva contraseña'
                    register={register('newPasswordConfirm')}
                    type='password'
                    error={errors.newPasswordConfirm?.message}
                />

                <div className='mt-10 flex justify-center gap-10'>
                    <Button type='submit' children='Guardar' className='w-full' />
                    <Button onClick={() => navigate(-1)} type='button' children='Cancelar' variant='danger' className='w-full' />
                </div>
            </form>
        </div>
    );
}
