
import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-2xl
    px-4 py-2
    font-medium
    focus:outline-none focus:ring-1 focus:ring-offset-1
    transition-transform transition-colors duration-200 ease-in-out
    active:scale-95
  `;

  const variantStyles = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
      focus:ring-blue-500
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300
      focus:ring-gray-400
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `
  };

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      {...props}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidthStyle}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
