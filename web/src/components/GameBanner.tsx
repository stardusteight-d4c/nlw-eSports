import React from 'react'

interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

const styles = {
  anchorCardContainer: `relative rounded-lg overflow-hidden`,
  infoOfCardWithOverlay: `w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90`,
  gameTitle: `font-bold text-white block`,
  adsQuantity: `text-zinc-300 text-sm block`,
}

const GameBanner = (props: GameBannerProps) => {
  return (
    <a href="" className={styles.anchorCardContainer}>
      <img src={props.bannerUrl} alt={`game/${props.title}`} />
      <div className={styles.infoOfCardWithOverlay}>
        <strong className={styles.gameTitle}>{props.title}</strong>
        <span className={styles.adsQuantity}>{props.adsCount} Anúncio(s)</span>
      </div>
    </a>
  )
}

export default GameBanner
