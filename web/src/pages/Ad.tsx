import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hostServer } from './Main'

interface Props {}

export const Ad = (props: Props) => {
  const { game: slug } = useParams()
  const [game, setGame] = useState<Game>()

  console.log(slug);
  

  useEffect(() => {
    const gameTitle = slug?.replaceAll('$25', ' ').replaceAll('$10','/')
    fetch(`${hostServer}/api/game/getGameByTitle?title=${gameTitle}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error))
  }, [slug])

  return (
    <div className={styles.wrapper}>
      <h1 className='text-3xl font-medium'>{game?.title}</h1>
    </div>
  )
}

const styles = {
  wrapper: `max-w-screen-xl text-white w-full mx-auto h-screen flex flex-col items-center`,
}
