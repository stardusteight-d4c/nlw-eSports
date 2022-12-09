import { useEffect, useState } from 'react'
import logoEsports from '/assets/logo-esports.svg'
import { MagnifyingGlassPlus } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from '../components/GameBanner'
import { CreateAdModal } from '../components/CreateAdModal'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface Props {}

export const Main = (props: Props) => {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    fetch('http://localhost:5000/api/game/games')
      .then((response) => response.json())
      .then((data) => {
        // setGames(data)
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <img src={logoEsports} alt='logo/nlw-eSports' />
      <h1 className={styles.mainTitle}>
        Your <span className={styles.nlwGradient}>duo</span> is here!
      </h1>

      <div className={styles.gamesAdsWrapper}>
        {games.length === 0 ? (
          <span className='text-3xl text-white/90 text-center w-full col-span-full'>
            No games yet
          </span>
        ) : (
          <>
            {games.map((game) => (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            ))}
          </>
        )}

        <Dialog.Root>
          <div className={styles.ads}>
            <div>
              <strong className='text-2xl text-white font-black block'>
                Didn't find your duo?
              </strong>
              <span className='text-zinc-400 block'>
                Post an ad to find new players!
              </span>
            </div>
            <Dialog.Trigger className='py-3 hover:bg-violet-600 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md'>
              <MagnifyingGlassPlus size={24} />
              Publish game
            </Dialog.Trigger>
            <Dialog.Trigger className='py-3 hover:bg-violet-600 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md'>
              <MagnifyingGlassPlus size={24} />
              Post ad
            </Dialog.Trigger>
          </div>
          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  )
}

const styles = {
  wrapper: `max-w-[1344px] mx-auto flex flex-col justify-center items-center mt-12 2xl:mt-20`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black mt-12 2xl:mt-20`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  noGamesYet: ``,
  gamesAdsWrapper: `grid grid-cols-6 w-full gap-6 mt-10  my-16 2xl:mt-16 px-24 2xl:px-0`,
  ads: `bg-[#2a2634] flex  justify-between  items-center relative px-8 py-6 col-span-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
}
