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
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'
import { GoogleLogo } from '../components/GoogleLogo'

const provider = new GoogleAuthProvider()

export const hostServer = import.meta.env.VITE_SERVER

interface Props {}

export const Main = (props: Props) => {
  const [games, setGames] = useState<Game[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [term, setTerm] = useState<string | null>()
  const [admins, setAdmins] = useState<string | null>()
  const currentUser = useAppSelector<User | null>(selectUser)
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 200)

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

  const searchProps = {
    setGames,
    setTerm,
    setPage,
  }

  const paginationProps = {
    page,
    setPage,
    totalPages,
    term,
  }

  const rendersArrows = () => (
    <>
      {!term && (
        <>
          {page !== 1 && (
            <ArrowCircleLeft
              size={52}
              onClick={() => setPage(page - 1)}
              className={`${style.arrow} -left-7`}
            />
          )}
          {page !== totalPages && (
            <ArrowCircleRight
              size={52}
              onClick={() => setPage(page + 1)}
              className={`${style.arrow} -right-7`}
            />
          )}
        </>
      )}
    </>
  )

  const rendersBannersAds = () => (
    <>
      {games.length === 0 || loading ? (
        <span className={style.noGamesYet}>
          {games.length === 0 ? <span>Sem games aqui</span> : <Loader />}
        </span>
      ) : (
        <div className={style.adsContainer}>
          {rendersArrows()}
          {games.map((game: Game, index: React.Key) => (
            <GameBanner key={index} game={game} />
          ))}
        </div>
      )}
      <Pagination {...paginationProps} />
    </>
  )

  const rendersDashboard = () => (
    <>
      {currentUser ? (
        <div className={style.buttonsWrapper}>
          <button
            type="button"
            onClick={() => auth.signOut()}
            className={style.buttonGoogleLogout}
          >
            <GoogleLogo />
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
          type="button"
          onClick={() => signInWithPopup(auth, provider)}
          className={style.buttonGoogleSignIn}
        >
          <GoogleLogo />
          Entre com o Google
        </button>
      )}
    </>
  )

  return (
    <div className={style.wrapper}>
      <img src={logoEsports} className={style.logo} alt="logo/nlw-eSports" />
      <h1 className={style.mainTitle}>
        Seu <span className={style.duoGradient}>duo</span> está aqui.
      </h1>
      <Search {...searchProps} />
      <div className={style.mainContentWrapper}>
        {rendersBannersAds()}
        <div className={style.actionsWrapper}>
          <div className={style.titleContainer}>
            <h3 className={style.title}>Não encontrou seu duo?</h3>
            <span className={style.span}>
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          {rendersDashboard()}
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `max-w-screen-xl min-h-screen my-14 md:my-24 2xl:my-0 2xl:py-14 mx-auto flex flex-col justify-center items-center`,
  logo: `w-[200px] md:w-[285px]`,
  mainTitle: `2xl:text-6xl md:text-5xl text-4xl text-white font-black py-8 2xl:py-14`,
  duoGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  noGamesYet: `text-5xl text-white/90 flex flex-col items-center justify-center text-center inline-block w-full max-h-[280px] min-h-[280px]`,
  mainContentWrapper: `w-full gap-6 mt-full`,
  adsContainer: `gap-1 md:gap-y-0 md:gap-x-4 relative grid grid-cols-3 md:grid-cols-6 mt-8 w-full`,
  arrow: `hidden md:block absolute bg-black/50 hover:brightness-125 hover:text-violet-600 transition-all duration-300 cursor-pointer text-white z-[1] rounded-full top-1/2 -translate-y-1/2`,
  actionsWrapper: `bg-[#2a2634] flex flex-col md:flex-row justify-between items-center relative px-4 md:px-8 py-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
  titleContainer: `text-center md:text-start`,
  title: `text-2xl text-white font-black block`,
  span: `text-zinc-400 block`,
  buttonsWrapper: `flex mt-5 md:mt-0 gap-y-3 flex-col-reverse md:flex-row items-center flex-wrap gap-x-4`,
  buttonGoogleLogout: `py-3 hover:bg-red-600 w-full md:w-fit justify-center transition-all duration-200 flex items-center gap-1 px-4 font-medium bg-red-500 text-white rounded-md`,
  buttonGoogleSignIn: `py-3 mt-4 md:mt-0 hover:bg-[#4285F4]/90 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-[#4285F4] text-white rounded-md`,
}
