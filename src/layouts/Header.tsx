import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    openBar: () => void;
}

export default function Header({ openBar }: HeaderProps) {
    return (
        <header className='flex justify-between p-5 sm:justify-end'>
            <button onClick={openBar} className='cursor-pointer sm:hidden'>
                <MenuIcon className='text-secondaryFont' />
            </button>
            <h1 className='text-2xl sm:text-3xl text-white'>Track my spending</h1>
        </header>
    );
}
