interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function Input({ className = '', type = 'text', ...props }: InputProps) {
    const baseClasses = 'bg-terceary w-full placeholder:text-secondaryFont text-secondaryFont rounded-lg outline-none autofill:bg-amber-500 ';
    return <input {...props} type={type} className={`${baseClasses} ${className}`} />;
}
