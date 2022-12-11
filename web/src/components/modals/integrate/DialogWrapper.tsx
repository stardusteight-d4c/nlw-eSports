import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  children: JSX.Element | JSX.Element[]
  modal: JSX.Element
}

export const DialogWrapper = ({ children, modal }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={style.triggerButton}>
        {children}
      </Dialog.Trigger>
      {modal}
    </Dialog.Root>
  )
}

const style = {
  triggerButton: `py-3 hover:bg-violet-600 justify-center transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md`,
}
