import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  title?: string
  children: JSX.Element | JSX.Element[]
}

export const DialogPortal = ({ title, children }: Props) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed z-20' />
      <Dialog.Content className='fixed z-50 2xl:h-fit bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg  shadow-md shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
