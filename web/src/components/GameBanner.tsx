import React from 'react'

interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export const GameBanner = (props: GameBannerProps) => {
  return (
    <a href='' className={styles.anchorCardContainer}>
      <img
        src={props.bannerUrl}
        alt={`game/${props.title}`}
        className={styles.img}
      />
      <div className={styles.infoOfCardWithOverlay}>
        <strong className={styles.gameTitle}>{props.title}</strong>
        <span className={styles.adsQuantity}>{props.adsCount} Anúncio(s)</span>
      </div>
    </a>
  )
}

// className="col-span-1"

const styles = {
  anchorCardContainer: `relative max-w-[172px] max-h-[230px] rounded-lg col-span-1 overflow-hidden`,
  img: `w-full h-full`,
  infoOfCardWithOverlay: `w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90`,
  gameTitle: `font-bold text-white block`,
  adsQuantity: `text-zinc-300 text-sm block`,
}
