import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = ({ className, ...props }: InputProps) => {
  return <input {...props} className={`${style.input + className}`} />
}

const style = {
  input: `bg-zinc-900 w-full placeholder:text-base text-base font-normal placeholder:text-zinc-500 focus:outline-none focus:ring focus:ring-violet-600 py-3 px-4 rounded text-sm `,
}
