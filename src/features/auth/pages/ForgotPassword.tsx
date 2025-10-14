import { useNavigate } from 'react-router';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

export default function ForgotPassword() {
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        navigate('/reset-password');
    }

    return (
        <form onSubmit={handleSubmit} className='flex w-[200px] flex-col gap-5 rounded sm:w-[400px]'>
            <p className='text-center'>
                Ingrese su dirección de correo electrónico y le enviaremos instrucciones sobre cómo restablecer su contraseña.
            </p>
            <Input type='email' placeholder='E-mail' className='py-2 pl-7' />
            <Button type='submit' className='self-end px-10'>
                Continuar
            </Button>
        </form>
    );
}
