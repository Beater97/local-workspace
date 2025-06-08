import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-lg
    px-3 py-1.5
    font-medium
    shadow
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition active:scale-95
  `

  const variantStyles = {
    primary: `
      bg-blue-500 text-white
      hover:bg-blue-600 active:bg-blue-700
      focus:ring-blue-400
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300 active:bg-gray-400
      focus:ring-gray-400
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700 active:bg-red-800
      focus:ring-red-500
    `
  }

  const fullWidthStyle = fullWidth ? 'w-full' : ''

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
  )
}

export default Button
