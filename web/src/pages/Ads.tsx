import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hostServer } from './Main'

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

  const formatDate = (date: Date) => (
    <>
      {new Date(date).getFullYear()}/{new Date(date).getMonth() + 1}/
      {new Date(date).getDate()} • {new Date(date).getHours()}:
      {new Date(date).getMinutes() <= 9
        ? '0' + new Date(date).getMinutes()
        : new Date(date).getMinutes()}
    </>
  )

  const convertWeekDays = (numberDay: string) =>
    numberDay.split(',').map((day) => (
      <span className="py-1 px-2 rounded-full bg-violet-600 text-sm cursor-pointer">
        {Number(day) === 0 && 'Dom'}
        {Number(day) === 1 && 'Seg'}
        {Number(day) === 2 && 'Ter'}
        {Number(day) === 3 && 'Qua'}
        {Number(day) === 4 && 'Qui'}
        {Number(day) === 5 && 'Sex'}
        {Number(day) === 6 && 'Sáb'}
      </span>
    ))

  return (
    <div className={styles.wrapper}>
      <div className="flex items-center rounded-md w-full max-w-[600px] bg-[#2A2634] p-4 gap-x-5">
        <img
          src={game?.bannerUrl}
          className="w-[100px] h-[150px] rounded-md object-fill"
        />
        <div className="my-8 text-center mx-auto">
          <h1 className="text-3xl font-medium w-[300px] line-clamp-2">
            {game?.title}
          </h1>
          <span className="text-gray-500">Conecte-se e comece a jogar!</span>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex flex-col gap-y-5 mx-auto">
          <div className="flex    rounded-md gap-x-5">
            {game?.ads?.map((ad, index) => (
              <div key={index} className="w-[280px] p-4 rounded-md bg-[#2A2634] ">
                <div className="text-gray-500 text-center">
                  {formatDate(new Date(ad.createdAt))}
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-gray-500 inline-block whitespace-nowrap">
                    Publicado por
                  </span>
                  <div className="flex items-center gap-x-2 mt-1">
                    <img src={ad.userImg} className="rounded-full w-8 h-8" />
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-gray-500">Nome</span>
                  <div className="font-semibold truncate text-lg">
                    {ad.name}
                  </div>
                </div>
                <div className="my-2">
                  <span className="text-gray-500">Tempo de jogo</span>
                  <div className="font-semibold text-lg">{ad.yearsPlaying}</div>
                </div>
                <div className="my-2">
                  <span className="text-gray-500">Disponibilidade</span>
                  <div className="font-semibold  flex flex-wrap gap-2">
                    {convertWeekDays(ad.weekDays)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: `max-w-screen-xl text-white w-full mx-auto h-screen flex flex-col items-center pt-14`,
}
