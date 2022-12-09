import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hostServer } from './Main'

interface Props {}

export const Ad = (props: Props) => {
  const { game: slug } = useParams()
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    const gameTitle = slug?.replaceAll('%', ' ')
    fetch(`${hostServer}/api/game/${gameTitle}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error))
  }, [slug])

  return <div className={styles.wrapper}>{game?.title}</div>
}

const styles = {
  wrapper: `max-w-screen-xl w-full mx-auto h-screen flex flex-col items-center`,
}
