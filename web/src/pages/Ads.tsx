import { ArrowLeft, GameController, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConnectModal } from '../components/modals/ConnectModal'
import { DialogWrapper } from '../components/modals/integrate/DialogWrapper'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/userSlice'
import { hostServer } from './Main'

interface Props {}

export const Ads = (props: Props) => {
  const { game: slug } = useParams()
  const [game, setGame] = useState<Game>()
  const navigate = useNavigate()
  const currentUser = useAppSelector<User | null>(selectUser)

  const dataLoaded =
    game !== undefined && game.ads?.length !== undefined && game.ads?.length > 0

  useEffect(() => {
    const gameTitle = slug?.replaceAll('$25', ' ').replaceAll('$10', '/')
    fetch(`${hostServer}/api/game/getGameByTitle?title=${gameTitle}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error))
  }, [slug])

  function convertMinutesToHourString(minutesAmount: number) {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}`
  }

  const deleteAd = async (adId: string) => {
    fetch(`${hostServer}/api/game/ads/deleteAdvertisement/${adId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => document.location.reload())
      .catch((error) => console.log(error))
  }

  const rendersWeekDays = (numberDay: string) => {
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const daysOff = numberDay.split(',')

    return weekDays.map((day, index) => (
      <span
        key={index}
        className={`${
          daysOff.includes(index.toString()) ? 'bg-violet-500' : 'bg-white/10 '
        } ${style.weekDay}`}
      >
        {day}
      </span>
    ))
  }

  const rendersAd = () => (
    <>
      {game?.ads?.map((ad, index) => (
        <div key={index} className={style.adWrapper}>
          {ad.userEmail === currentUser?.email && (
            <X
              size={18}
              className={style.removeAdIcon}
              onClick={() => deleteAd(ad.id)}
            />
          )}
          <div className={style.adContentContainer}>
            <div>
              <span className={style.span}>Publicado por</span>
              <div title={ad.name} className={style.userInfoContainer}>
                <img src={ad.userImg} className={style.userImg} />
                <span className={style.userName}>{ad.name}</span>
              </div>
            </div>
            <div className={style.marginDivider.top}>
              <span className={style.span}>Tempo de jogo</span>
              <div className={style.yearsPlaying}>
                {ad.yearsPlaying}{' '}
                {(ad.yearsPlaying === 0 && '') ||
                  (ad.yearsPlaying === 1 && 'ano') ||
                  (ad.yearsPlaying > 1 && 'anos')}
              </div>
            </div>
            <div className={style.marginDivider.vertical}>
              <span className={style.span}>Disponibilidade</span>
              <div className={style.availabilityContainer}>
                <div>
                  <div className={style.gameScheduleContainer}>
                    <span className={style.span}>Entre</span>{' '}
                    {convertMinutesToHourString(ad.hourStart)}{' '}
                    <span className={style.span}>e</span>{' '}
                    {convertMinutesToHourString(ad.hourEnd)}
                  </div>
                </div>
                {rendersWeekDays(ad.weekDays)}
              </div>
            </div>
            <div className={style.marginDivider.vertical}>
              <span className={style.span}>Chamada de áudio?</span>
              <div
                className={`${
                  ad.useVoiceChannel ? 'text-green-500' : 'text-red-500'
                } ${style.useVoiceChannel}`}
              >
                {ad.useVoiceChannel ? 'Sim' : 'Não'}
              </div>
            </div>
            <DialogWrapper modal={<ConnectModal userDiscord={ad.discord} />}>
              <GameController size={24} />
              <span>Conectar</span>
            </DialogWrapper>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.contentContainer}>
        <ArrowLeft
          size={32}
          onClick={() => navigate('/')}
          className={style.backIcon}
        />
        <div className={style.gameImgContainer}>
          <img src={game?.bannerUrl} className={style.gameImg} />
          <div className={style.gradientBorder} />
        </div>
        <div className={style.infoContainer}>
          <h1 className={style.gameTitle}>{game?.title}</h1>
          <span className={style.titleSpan}>Conecte-se e comece a jogar!</span>
        </div>
        <div className={style.adsWrapper}>
          {dataLoaded ? (
            rendersAd()
          ) : (
            <span className={style.noAdsSpan}>Ainda não há anúncios</span>
          )}
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `bg-[#2A2634] z-10 text-white w-screen mx-auto flex flex-col items-center justify-center`,
  contentContainer: `flex relative flex-col max-w-[1075px] min-h-screen z-10 bg-[#2A2634] items-center justify-center rounded-md overflow-hidden w-full py-4`,
  backIcon: `text-xl absolute top-10 left-10 p-1 cursor-pointer`,
  gameImgContainer: `relative mt-8 w-24 h-24`,
  gameImg: `w-24 h-24 rounded-full object-cover`,
  gradientBorder: `absolute -left-[2px] -top-[2px] mx-auto inset-0 w-[100px] h-[100px] -z-10 rounded-full bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D]`,
  infoContainer: `my-2 text-center relative mx-auto`,
  gameTitle: `text-3xl mt-2 font-medium w-[300px] line-clamp-2`,
  titleSpan: `text-gray-400`,
  adsWrapper: `flex mt-8 md:mt-0 items-center flex-wrap justify-center md:justify-start`,
  adWrapper: `max-w-[250px] relative mb-8 rounded-md mx-2 min-w-[250px] py-4 bg-[#2A2634]`,
  removeAdIcon: `absolute hover:text-red-500 transition-all duration-300 right-[42px] top-5 cursor-pointer text-zinc-500`,
  adContentContainer: `mx-auto flex flex-col w-fit`,
  span: `text-[#C4C4C6] font-medium`,
  userInfoContainer: `font-semibold truncate text-lg flex items-center cursor-pointer gap-x-2`,
  userImg: `rounded-full w-8 h-8`,
  userName: `truncate w-[125px]`,
  marginDivider: {
    top: `mt-2`,
    vertical: `my-2`,
  },
  yearsPlaying: `font-semibold text-lg truncate w-[125px]`,
  availabilityContainer: `font-semibold w-[150px] flex flex-wrap gap-2`,
  gameScheduleContainer: `inline-block w-full text-sm`,
  weekDay: `py-[2px] px-[4px] h-fit rounded-md text-xs cursor-pointer`,
  useVoiceChannel: `font-semibold text-lg`,
  noAdsSpan: `text-gray-500 text-3xl my-5`,
}
