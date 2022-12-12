import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  title?: string
  children: JSX.Element | JSX.Element[]
}

export const DialogPortal = ({ title, children }: Props) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={style.overlay} />
      <Dialog.Content className={style.content}>
        <Dialog.Title className={style.title}>{title}</Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

const style = {
  overlay: `bg-black/60 inset-0 fixed z-20`,
  content: `fixed z-50 w-[95vw] md:w-fit py-4 px-8 md:h-fit bg-[#2A2634] md:py-8 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md shadow-black/25`,
  title: `text-xl md:text-3xl font-black`,
}
