import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({ fullWidth = false, className = '', ...props }) => {
  const baseStyles = `
  rounded-lg
  border border-gray-300
  px-3 py-2
  shadow
  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
  transition duration-200
  hover:border-blue-400
  bg-white
`

  const fullWidthStyle = fullWidth ? 'w-full' : ''

  return (
    <input
      {...props}
      className={`
        ${baseStyles}
        ${fullWidthStyle}
        ${className}
      `}
    />
  )
}

export default Input
