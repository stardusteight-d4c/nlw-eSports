import * as Dialog from '@radix-ui/react-dialog'
import { PencilCircle, PlusCircle, X, XCircle } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import Input from './integrate/Input'
import { DialogPortal } from './integrate/DialogPortal'

const hostServer = import.meta.env.VITE_SERVER

export const ManageGame = () => {
  const [posterURL, setPosterURL] = useState<string | null>(null)
  const [gameName, setGameName] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string>('add')
  const [results, setResults] = useState<Game[]>([])
  const [term, setTerm] = useState<string | null>(null)
  const [game, setGame] = useState<Game>()

  const handleAddGame = async (event: FormEvent) => {
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
        document.getElementById('cancel')!.click()
      })
      .catch((error) => console.log(error))
  }

  const handleUpdateGame = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    fetch(`${hostServer}/api/game/updateGame`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, id: game?.id }),
    })
      .then(() => {
        document.getElementById('cancel')!.click()
      })
      .catch((error) => console.log(error))

    setGame(undefined)
    setGameName('')
    setPosterURL('')
    setTerm(null)
  }

  const handleDeleteGame = async (event: FormEvent) => {
    event.preventDefault()
    fetch(`${hostServer}/api/game/deleteGame?gameId=${game?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        document.getElementById('cancel')!.click()
      })
      .catch((error) => console.log(error))

    setGame(undefined)
    setGameName('')
    setPosterURL('')
    setTerm(null)
  }

  const rendersTitle = () => {
    if (activeItem === 'add') return 'Adicionar game'
    if (activeItem === 'edit') return 'Editar game'
    if (activeItem === 'del') return 'Deletar game'
    return ''
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleTerm = e.target.value
    term === '' ? setTerm(null) : setTerm(handleTerm)

    if (term !== null) {
      fetch(`${hostServer}/api/game/searchGameByTitle?title=${handleTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.slice(0, 4))
        })
        .catch((error) => console.log(error))
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    activeItem === 'add' && handleAddGame(event)
    activeItem === 'edit' && handleUpdateGame(event)
    activeItem === 'del' && handleDeleteGame(event)
  }

  return (
    <DialogPortal title={rendersTitle()}>
      <div className='space-x-2 mt-1'>
        <span
          onClick={() => {
            setActiveItem('add')
            setGame(undefined)
            setGameName('')
            setPosterURL(null)
          }}
          className={`${
            activeItem === 'add' ? 'border-blue-500' : 'border-gray-600'
          } text-xs rounded-full bg-transparent border px-1 py-[2px] cursor-pointer`}
        >
          Adicionar
        </span>
        <span
          onClick={() => {
            setActiveItem('edit')
            setGame(undefined)
            setGameName('')
            setPosterURL(null)
            setResults([])
          }}
          className={`${
            activeItem === 'edit' ? 'border-green-500' : 'border-gray-600'
          } text-xs rounded-full bg-transparent border px-1 py-[2px] cursor-pointer`}
        >
          Editar
        </span>
        <span
          onClick={() => {
            setActiveItem('del')
            setGame(undefined)
            setGameName('')
            setPosterURL(null)
          }}
          className={`${
            activeItem === 'del' ? 'border-red-500' : 'border-gray-600'
          } text-xs rounded-full bg-transparent border px-1 py-[2px] cursor-pointer`}
        >
          Deletar
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
        className='mt-4 flex items-center justify-center gap-4'
      >
        <div className='space-y-5'>
          <div className='flex flex-col space-y-[73px] relative gap-y-2'>
            <div className='space-y-2'>
              <label
                htmlFor='name'
                className='font-semibold inline-block w-full'
              >
                Nome
              </label>
              <Input
                id='name'
                value={gameName || ''}
                onChange={(e) => {
                  activeItem !== 'add' && handleSearch(e)
                  ;(activeItem === 'edit' || !game) &&
                    setGameName(e.target.value)
                }}
                name='title'
                placeholder={
                  activeItem === 'add' ? 'Nome do game' : 'Procurar game'
                }
              />
            </div>
            {activeItem !== 'add' && (
              <>
                {game && (
                  <div className='absolute text-xs top-1 flex items-center gap-x-1'>
                    <span className='rounded-full line-clamp-1 top-1'>{game?.title}</span>
                    <X
                      size={16}
                      onClick={() => {
                        setGame(undefined)
                        setGameName('')
                        setPosterURL(null)
                        setResults([])
                      }}
                      className='font-bold text-red-500 cursor-pointer'
                    />
                  </div>
                )}
              </>
            )}
            {activeItem !== 'add' &&
              term !== '' &&
              results.length > 0 &&
              !game && (
                <div className='absolute bg-[#2A2634] border z-50 border-white/10 rounded-md w-full'>
                  {results?.map((result, index) => (
                    <span
                      key={index}
                      onClick={() => {
                        setGame(result)
                        setPosterURL(result.bannerUrl)
                        setGameName(result.title)
                        setTerm('')
                      }}
                      className='line-clamp-1 hover:bg-white/10 rounded-md cursor-pointer p-1'
                    >
                      {result.title}
                    </span>
                  ))}
                </div>
              )}
          </div>
          {(activeItem === 'add' || activeItem === 'edit') && (
            <div className='flex flex-col gap-y-2'>
              <label htmlFor='poster' className='font-semibold'>
                Poster
              </label>
              <Input
                id='poster'
                onChange={(e) => setPosterURL(e.target.value)}
                value={posterURL || ''}
                name='bannerUrl'
                placeholder='URL da capa do game'
              />
            </div>
          )}
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
            onClick={() => {
              setActiveItem('add')
              setGame(undefined)
              setGameName('')
              setPosterURL(null)
              setResults([])
            }}
            className='bg-zinc-500 transition-all duration-200 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'
          >
            Cancelar
          </Dialog.Close>
          <button
            type='submit'
            className='bg-violet-500 transition-all duration-200 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'
          >
            {activeItem === 'add' && (
              <>
                <PlusCircle size={24} /> Adicionar
              </>
            )}
            {activeItem === 'edit' && (
              <>
                <PencilCircle size={24} /> Editar
              </>
            )}
            {activeItem === 'del' && (
              <>
                <XCircle size={24} /> Deletar
              </>
            )}
          </button>
        </footer>
      </form>
    </DialogPortal>
  )
}
