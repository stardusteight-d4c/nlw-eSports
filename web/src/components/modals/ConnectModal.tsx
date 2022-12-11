import { DialogPortal } from './integrate/DialogPortal'
import * as Dialog from '@radix-ui/react-dialog'

import { CheckCircle, X } from 'phosphor-react'

interface Props {
  userDiscord: string
}

export const ConnectModal = ({ userDiscord }: Props) => {
  return (
    <DialogPortal>
      <Dialog.Close>
        <X
          size={24}
          className="absolute right-5 top-5 cursor-pointer text-zinc-500"
        />
      </Dialog.Close>
      <div className="flex flex-col items-center justify-center w-[250px]">
        <CheckCircle size={68} className="text-emerald-400" />
        <div className="text-center my-5">
          <h1 className="text-3xl font-semibold">Let's play!</h1>
          <span className="text-gray-400 inline-block mt-1">
            Agora é só começar a jogar!
          </span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium">Adicione no Discord</h2>
          <div
            title="Clique para copiar!"
            onClick={() => {
              navigator.clipboard.writeText(userDiscord)
            }}
            className="py-3 px-11 bg-zinc-900 rounded-md text-center mt-2 cursor-pointer"
          >
            {userDiscord}
          </div>
        </div>
      </div>
    </DialogPortal>
  )
}
