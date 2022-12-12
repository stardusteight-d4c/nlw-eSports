import { MagnifyingGlass } from 'phosphor-react'
import React from 'react'

const hostServer = import.meta.env.VITE_SERVER

interface Props {
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
  setTerm: React.Dispatch<React.SetStateAction<string | null | undefined>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Search = ({ setGames, setTerm, setPage }: Props) => {
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setTerm(term)
    fetch(`${hostServer}/api/game/searchGameByTitle?title=${term}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
        setPage(1)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className='relative group'>
      <MagnifyingGlass
        size={24}
        className='absolute z-20 group-focus-within:text-violet-600 left-2 text-zinc-500 top-1/2 -translate-y-1/2'
      />
      <input
        onChange={(e) => handleSearch(e)}
        type='text'
        placeholder='Procure por um game'
        className='bg-[#2a2634] brightness-105 placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-600 text-white px-10 py-2 shadow-md rounded-md outline-none w-[95vw] md:w-[400px]'
      />
    </div>
  )
}
