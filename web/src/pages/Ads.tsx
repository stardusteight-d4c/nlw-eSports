import { GameController } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConnectModal } from '../components/modals/ConnectModal'
import { DialogWrapper } from '../components/modals/integrate/DialogWrapper'
import { hostServer } from './Main'
import logoEsports from '/assets/logo-esports.svg'

interface Props {}

export const Ads = (props: Props) => {
  const { game: slug } = useParams()
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    const gameTitle = slug?.replaceAll('$25', ' ').replaceAll('$10', '/')
    fetch(`${hostServer}/api/game/getGameByTitle?title=${gameTitle}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error))
  }, [slug])

  console.log(game)

  const rendersWeekDays = (numberDay: string) => {
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const daysOff = numberDay.split(',')

    return weekDays.map((day, index) => (
      <span
        key={index}
        className={`${
          daysOff.includes(index.toString()) ? 'bg-violet-500' : 'bg-white/10 '
        } py-[2px] px-[4px] h-fit rounded-md text-xs cursor-pointer`}
      >
        {day}
      </span>
    ))
  }

  function convertMinutesToHourString(minutesAmount: number) {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}`
  }

  return (
    <div className={styles.wrapper}>
      <div className="flex flex-col min-h-screen z-10 bg-[#2A2634] items-center justify-center rounded-md overflow-hidden w-full  py-4">
        <div className="relative mt-8 w-24 h-24">
          <img
            src={game?.bannerUrl}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="absolute -left-[2px] -top-[2px] mx-auto inset-0 w-[100px] h-[100px] -z-10 rounded-full bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]" />
        </div>
        <div className="my-2  text-center relative mx-auto">
          <h1 className="text-3xl mt-2 font-medium w-[300px] line-clamp-2">
            {game?.title}
          </h1>
          <span className="text-gray-400">Conecte-se e comece a jogar!</span>
        </div>
        <div className="flex items-center flex-wrap justify-start">
          {game !== undefined &&
          game.ads?.length !== undefined &&
          game.ads?.length > 0 ? (
            <>
              {game?.ads?.map((ad, index) => (
                <div
                  key={index}
                  className="max-w-[250px] mb-8 rounded-md mx-2 min-w-[250px] py-4 bg-[#2A2634]"
                >
                  <div className="mx-auto flex flex-col w-fit">
                    <div>
                      <span className="text-[#C4C4C6] font-medium mb-1">
                        Publicado por
                      </span>
                      <div
                        title={ad.name}
                        className="font-semibold truncate text-lg flex items-center gap-x-2"
                      >
                        <img
                          src={ad.userImg}
                          className="rounded-full w-8 h-8"
                        />
                        <span className="truncate w-[125px]">{ad.name}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-[#C4C4C6] font-medium">
                        Tempo de jogo
                      </span>
                      <div className="font-semibold text-lg truncate w-[125px]">
                        {ad.yearsPlaying} anos
                      </div>
                    </div>
                    <div className="my-2">
                      <span className="text-[#C4C4C6] font-medium">
                        Disponibilidade
                      </span>
                      <div className="font-semibold w-[150px] flex flex-wrap gap-2">
                        <div>
                          <div className="inline-block w-full text-sm">
                            <span className="text-[#C4C4C6]">Entre</span>{' '}
                            {convertMinutesToHourString(ad.hourStart)}{' '}
                            <span className="text-[#C4C4C6]">e</span>{' '}
                            {convertMinutesToHourString(ad.hourEnd)}
                          </div>
                        </div>
                        {rendersWeekDays(ad.weekDays)}
                      </div>
                    </div>
                    <div className="my-2">
                      <span className="text-[#C4C4C6] font-medium">
                        Chamada de áudio?
                      </span>
                      <div
                        className={`${
                          ad.useVoiceChannel ? 'text-green-500' : 'text-red-500'
                        } font-semibold text-lg`}
                      >
                        {ad.useVoiceChannel ? 'Sim' : 'Não'}
                      </div>
                    </div>
                    <DialogWrapper
                      modal={<ConnectModal userDiscord={ad.discord} />}
                    >
                      <GameController size={24} />
                      <span>Conectar</span>
                    </DialogWrapper>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <span className='text-gray-500 text-4xl my-5'>Ainda não há anúncios</span>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: `bg-[#2A2634] px-[225px] z-10 text-white w-screen mx-auto flex flex-col items-center justify-center`,
}
