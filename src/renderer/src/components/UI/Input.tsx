import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  fullWidth = false,
  className = '',
  ...props
}) => {
const baseStyles = `
  rounded-2xl
  border border-gray-300
  px-4 py-2
  shadow-inner
  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
  transition-all duration-200 ease-in-out
  hover:border-blue-400
  hover:shadow-md
  placeholder-gray-400
  bg-white
`;


  const fullWidthStyle = fullWidth ? 'w-full' : '';

  return (
    <input
      {...props}
      className={`
        ${baseStyles}
        ${fullWidthStyle}
        ${className}
      `}
    />
  );
};

export default Input;
