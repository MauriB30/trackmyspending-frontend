import { Link } from 'react-router';

type LinkButtonProps = {
    path: string;
    children: React.ReactNode;
};

export default function LinkButton({ path, children }: LinkButtonProps) {
    return (
        <Link to={path} className='bg-buttonActive hover:bg-buttonHover inline-flex cursor-pointer rounded-lg p-2'>
            {children}
        </Link>
    );
}
