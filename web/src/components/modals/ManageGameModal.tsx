import * as Dialog from '@radix-ui/react-dialog'
import { PencilCircle, PlusCircle, X, XCircle } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { Input } from './integrate/Input'
import { DialogPortal } from './integrate/DialogPortal'

const hostServer = import.meta.env.VITE_SERVER

export const ManageGameModal = () => {
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
    clearForm()
  }

  const handleDeleteGame = async (event: FormEvent) => {
    event.preventDefault()
    fetch(`${hostServer}/api/game/deleteGame?gameId=${game?.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => document.getElementById('cancel')!.click())
      .catch((error) => console.log(error))
    clearForm()
  }

  const rendersModalTitle = () => {
    if (activeItem === 'add') return 'Adicionar game'
    if (activeItem === 'edit') return 'Editar game'
    if (activeItem === 'del') return 'Deletar game'
    return ''
  }

  const rendersHeaderActions = () => (
    <div className={style.headerContainer}>
      <span
        onClick={() => {
          setActiveItem('add')
          clearForm()
        }}
        className={`${
          activeItem === 'add' ? 'border-blue-500' : 'border-gray-600'
        } ${style.actionSpan}`}
      >
        Adicionar
      </span>
      <span
        onClick={() => {
          setActiveItem('edit')
          clearForm()
        }}
        className={`${
          activeItem === 'edit' ? 'border-green-500' : 'border-gray-600'
        } ${style.actionSpan}`}
      >
        Editar
      </span>
      <span
        onClick={() => {
          setActiveItem('del')
          clearForm()
        }}
        className={`${
          activeItem === 'del' ? 'border-red-500' : 'border-gray-600'
        } ${style.actionSpan}`}
      >
        Deletar
      </span>
    </div>
  )

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleTerm = e.target.value
    term === '' ? setTerm(null) : setTerm(handleTerm)
    if (term !== null) {
      fetch(`${hostServer}/api/game/searchGameByTitle?title=${handleTerm}`)
        .then((res) => res.json())
        .then((data) => setResults(data.slice(0, 4)))
        .catch((error) => console.log(error))
    }
  }

  const inputNameProps = {
    id: 'name',
    value: gameName || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      activeItem !== 'add' && handleSearch(e)
      ;(activeItem === 'edit' || !game) && setGameName(e.target.value)
    },
    name: 'title',
    placeholder: activeItem === 'add' ? 'Nome do game' : 'Procurar game',
  }

  const inputPosterProps = {
    id: 'poster',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPosterURL(e.target.value),
    value: posterURL || '',
    name: 'bannerUrl',
    placeholder: 'URL da capa do game',
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    activeItem === 'add' && handleAddGame(event)
    activeItem === 'edit' && handleUpdateGame(event)
    activeItem === 'del' && handleDeleteGame(event)
  }

  const clearForm = () => {
    setGame(undefined)
    setGameName('')
    setPosterURL(null)
    setResults([])
  }

  const handleSelectedGame = (result: Game) => {
    setGame(result)
    setPosterURL(result.bannerUrl)
    setGameName(result.title)
    setTerm('')
  }

  const rendersClearSearch = () => (
    <>
      {activeItem !== 'add' && (
        <>
          {game && (
            <X
              size={16}
              onClick={() => clearForm()}
              className={style.xClearSearchIcon}
            />
          )}
        </>
      )}
    </>
  )

  const rendersResults = () => (
    <>
      {activeItem !== 'add' && term !== '' && results.length > 0 && !game && (
        <div className={style.resultsWrapper}>
          {results?.map((result, index) => (
            <span
              key={index}
              onClick={() => handleSelectedGame(result)}
              className={style.result}
            >
              {result.title}
            </span>
          ))}
        </div>
      )}
    </>
  )

  const buttonActions = () => (
    <>
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
    </>
  )

  return (
    <DialogPortal title={rendersModalTitle()}>
      <div className={style.wrapper}>
        {rendersHeaderActions()}

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={style.formWrapper}
        >
          <div className={style.inputsContainer}>
            <label htmlFor="name" className={style.label}>
              Nome
            </label>
            <div className={style.inputNameContainer}>
              <Input {...inputNameProps} />
              {rendersClearSearch()}
              {rendersResults()}
            </div>
            {activeItem !== 'del' && (
              <>
                <label htmlFor="poster" className={style.label}>
                  Poster
                </label>
                <Input {...inputPosterProps} />
              </>
            )}
          </div>
          {posterURL !== null ? (
            <img src={posterURL} className={style.posterImg} />
          ) : (
            <div className={style.posterImg} />
          )}

          <footer className={style.footerWrapper}>
            <Dialog.Close
              type="button"
              id="cancel"
              onClick={() => clearForm()}
              className={style.buttonCloseModal}
            >
              Cancelar
            </Dialog.Close>
            <button type="submit" className={style.buttonSubmitActions}>
              {buttonActions()}
            </button>
          </footer>
        </form>
      </div>
    </DialogPortal>
  )
}

const style = {
  wrapper: `pb-20 w-full max-w-[95vw] md:max-w-[400px]`,
  headerContainer: 'space-x-2 mt-1',
  actionSpan: `text-xs rounded-full bg-transparent border px-1 py-[2px] cursor-pointer`,
  formWrapper: `mt-4 flex flex-col md:flex-row items-center justify-center gap-4`,
  inputsContainer: `space-y-2 relative`,
  label: `font-semibold mt-2 inline-block`,
  inputNameContainer: `relative -space-y-0`,
  xClearSearchIcon: `font-bold text-red-500 cursor-pointer absolute text-xs top-4 right-2`,
  resultsWrapper: `absolute bg-[#2A2634] border z-50 border-white/10 rounded-md w-full`,
  result: `line-clamp-1 hover:bg-white/10 rounded-md cursor-pointer p-1`,
  posterImg: `max-w-[140px] min-w-[140px] min-h-[200px] max-h-[200px] border border-dashed`,
  footerWrapper: `mt-4 absolute bottom-[32px] right-[30px] md:right-[40px] flex justify-end gap-4`,
  buttonCloseModal: `bg-zinc-500 transition-all duration-200 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold`,
  buttonSubmitActions: `bg-violet-500 transition-all duration-200 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3`,
}
