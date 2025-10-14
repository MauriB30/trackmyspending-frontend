import Button from '../../../components/Button';
import Input from '../../../components/Input';

export default function ResetPassword() {
    function handleSubmit() {}

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 rounded'>
            <p className='mb-5 w-[450px] text-center'>Por favor, cambia tu contraseña para continuar.</p>
            <Input type='password' placeholder='Nueva contraseña' className='py-2 pl-7' />
            <Input type='password' placeholder='Repetir nueva contraseña' className='py-2 pl-7' />
            <Button type='submit' className='self-end px-10'>
                Continuar
            </Button>
        </form>
    );
}
