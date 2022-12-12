import { DialogPortal } from './integrate/DialogPortal'
import * as Dialog from '@radix-ui/react-dialog'

import { CheckCircle, CopySimple, X } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  userDiscord: string
}

export const ConnectModal = ({ userDiscord }: Props) => {
  const [copied, setCopied] = useState<boolean>(false)

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCopied(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  return (
    <div ref={wrapperRef}>
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
                setCopied(true)
              }}
              className="py-3 relative px-11 bg-zinc-900 rounded-md text-center mt-2"
            >
              <CopySimple
                size={18}
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(userDiscord)
                  setCopied(true)
                }}
                className={`${
                  copied ? 'text-green-500' : 'text-zinc-400'
                } absolute right-2 top-[14px]  cursor-pointer`}
              />
              {userDiscord}
            {copied && (
              <span className="text-sm w-[115%] text-gray-500 mt-1 absolute -bottom-5 -left-3">
                Copiado para area de transferência!
              </span>
            )}
            </div>
          </div>
        </div>
      </DialogPortal>
    </div>
  )
}
