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
import { ManageGameModal } from '../components/modals/ManageGameModal'
import { Search } from '../components/Search'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/userSlice'

export const hostServer = import.meta.env.VITE_SERVER

interface Props {}

export const Main = (props: Props) => {
  const [games, setGames] = useState<Game[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [term, setTerm] = useState<string | null>()
  const [admins, setAdmins] = useState<string | null>()
  const currentUser = useAppSelector<User | null>(selectUser)
  const [pagination, setPagination] = useState<any>([])

  useEffect(() => {
    fetch(`${hostServer}/api/game/games/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games)
        setTotalItems(data.total)
      })
      .catch((error) => console.log(error))
  }, [page])

  useEffect(() => {
    fetch('./admins.json')
      .then((res) => res.json())
      .then((data) => setAdmins(data.admins))
      .catch((error) => console.log(error))
  }, [currentUser])

  const isUserAdmin = () => {
    return currentUser && admins?.includes(currentUser.email)
  }

  const totalPages = Math.ceil(totalItems / 6)

  const provider = new GoogleAuthProvider()

  useEffect(() => {
    const rendersPagination = (page: number, totalPages: number) => {
      const pages = []
      if (totalPages <= 4) {
        let i = 0
        while (i < totalPages) {
          i++
          pages.push(i)
        }
      } else if (totalPages > 4 && page <= 2) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (page === totalPages) {
        pages.push(1, '...', page - 2, page - 1, totalPages)
      } else if (page === totalPages - 1) {
        pages.push(page - 2, page - 1, page, totalPages)
      } else if (totalPages > 4 && page > 2) {
        pages.push(page - 2, page - 1, page, page + 1, '...', totalPages)
      }
      setPagination(pages)
    }
    rendersPagination(page, totalPages)
  }, [page, totalPages])

  // console.log(range(page, totalPages))
  const isString = (myVar: string | number | object) => {
    return typeof myVar === 'string' || myVar instanceof String
  }

  return (
    <div className={styles.wrapper}>
      <img
        src={logoEsports}
        alt="logo/nlw-eSports"
        className="w-[200px] md:w-[285px]"
      />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>
      <Search setGames={setGames} setTerm={setTerm} setPage={setPage} />
      <div className={styles.gamesAdsWrapper}>
        {games.length === 0 ? (
          <span className={styles.noGamesYet}>...</span>
        ) : (
          <div className="gap-1 md:gap-y-0 md:gap-x-4 relative grid grid-cols-3 md:grid-cols-6 mt-8 w-full">
            <>
              {!term && (
                <>
                  {page !== 1 && (
                    <ArrowCircleLeft
                      size={52}
                      onClick={() => setPage(page - 1)}
                      className="hidden md:block absolute bg-black/50 hover:brightness-125 hover:text-violet-600 transition-all duration-300 cursor-pointer text-white z-[1] rounded-full -left-7 top-1/2 -translate-y-1/2"
                    />
                  )}
                  {page !== totalPages && (
                    <ArrowCircleRight
                      size={52}
                      onClick={() => setPage(page + 1)}
                      className="hidden md:block absolute bg-black/50 hover:brightness-125 hover:text-violet-600 transition-all duration-300 cursor-pointer text-white z-[1] rounded-full -right-7 top-1/2 -translate-y-1/2"
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
        <div className="mx-auto w-full text-center">
          <span
            className={`mx-auto ${
              !term ? 'mt-4' : 'mt-[41px]'
            }  inline-block text-white text-2xl`}
          >
            {!term && (
              <div className="inline-block space-x-2">
                {pagination.map((pageItem: any, index: React.Key) => (
                  <span
                    key={index}
                    onClick={() => {
                      !isString(pageItem) && setPage(Number(pageItem))
                    }}
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
          <div className="text-center md:text-start">
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          {currentUser ? (
            <div className="flex mt-5 md:mt-0 gap-y-3 flex-col-reverse md:flex-row items-center flex-wrap gap-x-4">
              <button
                onClick={() => auth.signOut()}
                type="button"
                className="py-3 hover:bg-red-600 w-full md:w-fit justify-center transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-red-500 text-white rounded-md"
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sair
              </button>
              {isUserAdmin() && (
                <DialogWrapper modal={<ManageGameModal />}>
                  <PlusCircle size={24} />
                  <span>Gerenciar game</span>
                </DialogWrapper>
              )}
              <DialogWrapper modal={<CreateAdModal games={games} />}>
                <MagnifyingGlassPlus size={24} />
                <span>Publicar anúncio</span>
              </DialogWrapper>
            </div>
          ) : (
            <button
              onClick={() => signInWithPopup(auth, provider)}
              type="button"
              className="py-3 mt-4 md:mt-0 hover:bg-[#4285F4]/90 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-[#4285F4] text-white rounded-md"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Entre com o Google
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// className=""

const styles = {
  wrapper: `max-w-screen-xl min-h-screen my-14 md:my-24 2xl:my-0 2xl:py-14 mx-auto flex flex-col justify-center items-center`,
  mainTitle: `2xl:text-6xl md:text-5xl text-4xl text-white font-black py-8 2xl:py-14`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  noGamesYet: `text-5xl text-white/90 flex flex-col items-center justify-center text-center inline-block w-full max-h-[280px] min-h-[280px]`,
  gamesAdsWrapper: `w-full gap-6 mt-full`,
  ads: `bg-[#2a2634] flex flex-col md:flex-row justify-between items-center relative px-4 md:px-8 py-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
}
