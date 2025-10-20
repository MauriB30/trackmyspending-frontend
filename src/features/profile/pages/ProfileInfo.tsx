import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Button from '../../../components/Button';
import FormField from '../../../components/form/FormField';
import LinkButton from '../../../components/LinkButton';
import { AuthContext } from '../../../context/AuthContext';
import { apiUpdateUser } from '../services/profileServices';

const editProfileSchema = z.object({
    name: z.string('El nombre no es valido').min(1, 'El nombre es requerido'),
    email: z.email('El email no es válido').min(1, 'El email es requerido'),
});

type editProfileType = z.infer<typeof editProfileSchema>;

export default function ProfileInfo() {
    const { user, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<editProfileType>({ resolver: zodResolver(editProfileSchema) });

    async function handleEdit(formData: editProfileType) {
        const { name, email } = formData;

        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        const { error } = await apiUpdateUser(name, email);

        if (error) {
            toast.error(error);
            setIsEditing(false);
            return;
        }

        toast.success('Perfil actualizado con éxito');
        setIsEditing(false);
    }

    function deleteAccount() {
        //apiDeleteUser(user!.userid);
        logout();
    }
    return (
        <div className='bg-secondary w-full max-w-[900px] space-y-5 rounded p-5'>
            <form onSubmit={handleSubmit(handleEdit)} className='space-y-5'>
                <FormField register={register('name')} defaultValue={user?.name} disabled={!isEditing} error={errors.name?.message} />
                <FormField register={register('email')} defaultValue={user?.email} disabled={!isEditing} error={errors.email?.message} />

                <div className='action-buttons space-x-5'>
                    <Button type='submit'>{isEditing ? 'Guardar' : 'Editar'}</Button>

                    <LinkButton path='change-password'>Cambiar contraseña</LinkButton>

                    <Button type='button' variant='danger' onClick={deleteAccount}>
                        Eliminar Cuenta
                    </Button>
                </div>
            </form>
        </div>
    );
}
