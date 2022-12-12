import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  return <input {...props} className={style.input} />
}

const style = {
  input: `bg-zinc-900 w-full placeholder:text-base text-base font-normal placeholder:text-zinc-500 focus:outline-none focus:ring focus:ring-violet-600 py-3 pl-4 pr-8 rounded text-sm`,
}
