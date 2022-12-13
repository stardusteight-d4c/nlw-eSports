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
          <X size={24} className={style.xCloseIcon} />
        </Dialog.Close>
        <div className={style.wrapperContent}>
          <CheckCircle size={68} className={style.checkCircle} />
          <div className={style.titleContainer}>
            <h1 className={style.title}>Let's play!</h1>
            <span className={style.spanTitle}>Agora é só começar a jogar!</span>
          </div>
          <div className={style.addContainer}>
            <h2 className={style.addTitle}>Adicione no Discord</h2>
            <div className={style.userDiscordContainer}>
              <CopySimple
                size={18}
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(userDiscord)
                  setCopied(true)
                }}
                className={`${copied ? 'text-green-500' : 'text-zinc-400'} ${
                  style.copyTextIcon
                }`}
              />
              {userDiscord}
              {copied && (
                <span className={style.copiedSpan}>
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

const style = {
  xCloseIcon: `absolute right-5 top-5 cursor-pointer text-zinc-500`,
  wrapperContent: `flex pb-4 flex-col items-center justify-center mx-auto w-[250px]`,
  checkCircle: `text-emerald-400`,
  titleContainer: `text-center my-5`,
  title: `text-3xl font-semibold`,
  spanTitle: `text-gray-400 inline-block mt-1`,
  addContainer: `flex flex-col items-center`,
  addTitle: `text-xl font-medium`,
  userDiscordContainer: `py-3 relative px-11 bg-zinc-900 rounded-md text-center mt-2`,
  copyTextIcon: `absolute right-2 top-[14px]  cursor-pointer`,
  copiedSpan: `text-sm w-[155%] inline-block text-gray-500 mt-1 absolute -bottom-6 -left-11`,
}
