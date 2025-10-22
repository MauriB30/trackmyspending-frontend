interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function Input({ className = '', type = 'text', ...props }: InputProps) {
    const baseClasses =
        'bg-slate-700/30 border border-slate-700/50 w-full placeholder:text-secondaryFont text-secondaryFont rounded-lg outline-none autofill:bg-amber-500 ';
    return <input {...props} type={type} className={`${baseClasses} ${className}`} />;
}
