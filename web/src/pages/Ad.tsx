import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hostServer } from './Main'

interface Props {}

export const Ad = (props: Props) => {
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

  return (
    <div className={styles.wrapper}>
      <div className='flex w-[700px] bg-[#2A2634] py-12 px-8 rounded-md gap-x-5'>
        <img
          src={game?.bannerUrl}
          className='w-[200px] h-[300px] rounded-md object-fill'
        />
        <div className='flex flex-col text-center mx-auto'>
          <h1 className='text-3xl font-medium line-clamp-2'>{game?.title}</h1>
          <span className='text-gray-500'>Conecte-se e comece a jogar!</span>
        {game?.ads?.map((ad, index) => (
          <div key={index}>{ad.createdAt}</div>
        ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: `max-w-screen-xl text-white w-full mx-auto h-screen flex flex-col items-center justify-center`,
}
