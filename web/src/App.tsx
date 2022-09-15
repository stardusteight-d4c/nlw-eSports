import { useEffect, useState } from 'react'
import './styles/main.css'
import GameBanner from './components/GameBanner'
import logoEsports from '/assets/logo-esports.svg'
import { GameController, MagnifyingGlassPlus } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'
import Input from './components/form/Input'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

const styles = {
  wrapper: `max-w-[1344px] mx-auto flex flex-col justify-center items-center mt-12 2xl:mt-20`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black mt-12 2xl:mt-20`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  gamesAds: {
    wrapper: `grid grid-cols-6 gap-6 mt-10 my-16 2xl:mt-16 px-24 2xl:px-0`,
    ads: {
      wrapper: `bg-[#2a2634] flex justify-between items-center relative px-8 py-6 col-span-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
    },
  },
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data)
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <img src={logoEsports} alt="logo/nlw-eSports" />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>

      <div className={styles.gamesAds.wrapper}>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}

        <Dialog.Root>
          <div className={styles.gamesAds.ads.wrapper}>
            <div>
              <strong className="text-2xl text-white font-black block">
                Não encontrou seu duo?
              </strong>
              <span className="text-zinc-400 block">
                Publique um anúncio para encontrar novos players!
              </span>
            </div>
            <Dialog.Trigger className="py-3 hover:bg-violet-600 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md">
              <MagnifyingGlassPlus size={24} />
              Publicar anúncio
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-md shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
                  <Input
                    id="name"
                    placeholder="Como te chamam dentro do game?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <div className="w-[180px] gap-2 gap-x-4 flex flex-wrap">
                      <button
                        title="Domingo"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        D
                      </button>
                      <button
                        title="Segunda"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button
                        title="Terça"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        T
                      </button>
                      <button
                        title="Quarta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button
                        title="Quinta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button
                        title="Sexta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button
                        title="Sábado"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" type="time" placeholder="De" />
                      <Input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button"
                    className="bg-zinc-500 transition-all duration-200 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 transition-all duration-200 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                  >
                    <GameController size={24} /> Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App
