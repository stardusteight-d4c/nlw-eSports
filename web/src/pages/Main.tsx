import React, { useEffect, useState } from 'react'
import logoEsports from '/assets/logo-esports.svg'
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  MagnifyingGlassPlus,
  PlusCircle,
} from 'phosphor-react'

import { GameBanner } from '../components/GameBanner'
import { CreateAdModal } from '../components/modals/CreateAdModal'
import { DialogWrapper } from '../components/modals/integrate/DialogWrapper'
import { AddGameModal } from '../components/modals/AddGameModal'
import { Search } from '../components/Search'

export const hostServer = import.meta.env.VITE_SERVER

interface Props {}

export const Main = (props: Props) => {
  const [games, setGames] = useState<Game[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [term, setTerm] = useState<string | null>()

  useEffect(() => {
    fetch(`${hostServer}/api/game/games/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games)
        setTotalItems(data.total)
      })
      .catch((error) => console.log(error))
  }, [page])

  const totalPages = Math.ceil(totalItems / 6)

  const rendersPagination = () => {
    let i = 0
    const pages = []
    while (i < totalPages) {
      i++
      pages.push(i)
    }
    return pages
  }

  return (
    <div className={styles.wrapper}>
      <img src={logoEsports} alt='logo/nlw-eSports' />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>
      <Search setGames={setGames} setTerm={setTerm} setPage={setPage} />
      <div className={styles.gamesAdsWrapper}>
        {games.length === 0 ? (
          <span className={styles.noGamesYet}>No games here</span>
        ) : (
          <div className='gap-x-4 relative grid grid-cols-6 mt-8 w-full'>
            <>
              {!term && (
                <>
                  {page !== 1 && (
                    <ArrowCircleLeft
                      size={52}
                      onClick={() => setPage(page - 1)}
                      className='absolute bg-black/50 hover:brightness-125 hover:text-violet-600 transition-all duration-300 cursor-pointer text-white z-[1] rounded-full -left-7 top-1/2 -translate-y-1/2'
                    />
                  )}
                  {page !== totalPages && (
                    <ArrowCircleRight
                      size={52}
                      onClick={() => setPage(page + 1)}
                      className='absolute bg-black/50 hover:brightness-125 hover:text-violet-600 transition-all duration-300 cursor-pointer text-white z-[1] rounded-full -right-7 top-1/2 -translate-y-1/2'
                    />
                  )}
                </>
              )}
              {games.map((game: Game, index: React.Key) => (
                <GameBanner key={index} game={game} />
              ))}
            </>
          </div>
        )}
        <div className='mx-auto w-full text-center'>
          <span
            className={`mx-auto ${
              !term ? 'mt-4' : 'mt-[41px]'
            }  inline-block text-white text-2xl`}
          >
            {!term && (
              <div className='inline-block space-x-2'>
                {rendersPagination().map((pageItem) => (
                  <span
                    onClick={() => setPage(pageItem)}
                    className={`cursor-pointer w-8 h-8 inline-block rounded-md hover:bg-white/10 transition-all duration-300 text-white ${
                      pageItem === page && '!bg-violet-500'
                    }`}
                  >
                    {pageItem}
                  </span>
                ))}
              </div>
            )}
          </span>
        </div>
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
            <DialogWrapper modal={<AddGameModal />}>
              <PlusCircle size={24} />
              <span>Adicionar game</span>
            </DialogWrapper>
            <DialogWrapper modal={<CreateAdModal games={games} />}>
              <MagnifyingGlassPlus size={24} />
              <span>Publicar anúncio</span>
            </DialogWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

// className=""

const styles = {
  wrapper: `max-w-screen-xl min-h-screen my-24 2xl:my-0 2xl:py-14 mx-auto flex flex-col justify-center items-center`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black py-8 2xl:py-14`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  noGamesYet: `text-5xl text-white/90 flex flex-col items-center justify-center text-center inline-block w-full max-h-[280px] min-h-[280px]`,
  gamesAdsWrapper: `w-full gap-6 mt-full`,
  ads: `bg-[#2a2634] flex justify-between  items-center relative px-8 py-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
}
