import { InputHTMLAttributes, LegacyRef, MutableRefObject } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: any
}

const Input = ({ ref, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className='bg-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring focus:ring-violet-600 py-3 px-4 rounded text-sm'
    />
  )
}

export default Input
