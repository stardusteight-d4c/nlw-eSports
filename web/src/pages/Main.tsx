import React, { useEffect, useState } from 'react'
import logoEsports from '/assets/logo-esports.svg'
import { MagnifyingGlassPlus, PlusCircle } from 'phosphor-react'

import { GameBanner } from '../components/GameBanner'
import { CreateAdModal } from '../components/CreateAdModal'
import { DialogWrapper } from '../components/DialogWrapper'
import { useNavigate } from 'react-router-dom'

export const hostServer = import.meta.env.VITE_SERVER

interface Props {}

export const Main = (props: Props) => {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch(`${hostServer}/api/game/games`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.wrapper}>
      <img src={logoEsports} alt='logo/nlw-eSports' />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>

      <div className={styles.gamesAdsWrapper}>
        {games.length === 0 ? (
          <span className={styles.noGamesYet}>No games yet</span>
        ) : (
          <div className='gap-x-4 grid grid-cols-6 mt-8 overflow-hidden w-full'>
            {games.map((game: Game, index: React.Key) => (
              <GameBanner key={index} game={game} />
            ))}
          </div>
        )}

        <div className={styles.ads}>
          <div>
            <strong className='text-2xl text-white font-black block'>
              Não encontrou seu duo?
            </strong>
            <span className='text-zinc-400 block'>
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <div className='flex items-center gap-x-4'>
            <button className='py-3 hover:bg-violet-600 transition-all duration-200 flex items-center justify-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md'>
              <PlusCircle size={24} />
              <span className='mt-[2px] inline-block'>Adicionar game</span>
            </button>
            <DialogWrapper modal={<CreateAdModal />}>
              <MagnifyingGlassPlus size={24} />
              <span className='mt-[2px] inline-block'>Publicar anúncio</span>
            </DialogWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: `max-w-screen-xl min-h-screen my-24 2xl:my-0 mx-auto flex flex-col justify-center items-center`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black py-8 2xl:py-14`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  noGamesYet: `text-3xl text-white/90 text-center w-full`,
  gamesAdsWrapper: `w-full gap-6 mt-full`,
  ads: `bg-[#2a2634] flex justify-between  items-center relative px-8 py-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
}
