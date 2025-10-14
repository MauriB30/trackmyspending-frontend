import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    className?: string;
}

const basesStyle = 'cursor-pointer rounded-lg p-2';

const variants = {
    primary: 'bg-buttonActive hover:bg-buttonHover',
    danger: 'bg-error hover:bg-red-800',
    icon: 'border px-1 py-1',
};

export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
    return (
        <button {...props} className={`${basesStyle} ${className} ${variants[variant]}`}>
            {children}
        </button>
    );
}
