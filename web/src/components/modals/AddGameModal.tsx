import * as Dialog from '@radix-ui/react-dialog'
import { PlusCircle } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import Input from './integrate/Input'
import { DialogPortal } from './integrate/DialogPortal'

const hostServer = import.meta.env.VITE_SERVER

export const AddGameModal = () => {
  const [posterURL, setPosterURL] = useState<string | null>(null)

  async function handleAddGame(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    fetch(`${hostServer}/api/game/addGame`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setPosterURL(null)
        document.getElementById('cancel')!.click()
      })
      .catch((error) => console.log(error))
  }

  return (
    <DialogPortal title='Adicionar game'>
      <form
        onSubmit={handleAddGame}
        className='mt-4 flex items-center justify-center gap-4'
      >
        <div className='space-y-5'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='name' className='font-semibold'>
              Name
            </label>
            <Input id='name' name='title' placeholder='Game name' />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='poster' className='font-semibold'>
              Poster
            </label>
            <Input
              onChange={(e) => setPosterURL(e.target.value)}
              id='poster'
              name='bannerUrl'
              placeholder='Game poster URL'
            />
          </div>
        </div>
        <div>
          {posterURL !== null ? (
            <img
              src={posterURL}
              className='max-w-[140px] min-w-[140px] min-h-[200px] max-h-[200px] border border-dashed'
            />
          ) : (
            <div className='max-w-[140px] min-w-[140px] min-h-[200px] max-h-[200px] border border-dashed' />
          )}
        </div>
        <footer className='mt-4 absolute bottom-[32px] right-[40px] flex justify-end gap-4'>
          <Dialog.Close
            type='button'
            id='cancel'
            className='bg-zinc-500 transition-all duration-200 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'
          >
            Cancelar
          </Dialog.Close>
          <button
            type='submit'
            className='bg-violet-500 transition-all duration-200 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'
          >
            <PlusCircle size={24} /> Adicionar
          </button>
        </footer>
      </form>
    </DialogPortal>
  )
}
