import './styles/main.css'
import logoEsports from '/assets/logo-esports.svg'
import { MagnifyingGlassPlus } from 'phosphor-react'

const styles = {
  wrapper: `max-w-[1344px] mx-auto flex flex-col justify-center items-center mt-12 2xl:mt-20`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black mt-12 2xl:mt-20`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  gamesAds: {
    wrapper: `grid grid-cols-6 gap-6 mt-10 my-16 2xl:mt-16 px-24 2xl:px-0`,
    card: {
      anchorCardContainer: `relative rounded-lg overflow-hidden`,
      infoOfCardWithOverlay: `w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90`,
      gameTitle: `font-bold text-white block`,
      adsQuantity: `text-zinc-300 text-sm block`,
    },
    ads: {
      wrapper: `bg-[#2a2634] flex justify-between items-center relative px-8 py-6 col-span-6 mt-8 rounded-lg before:absolute before:-top-1 before:inset-x-0 before:rounded-b before:-z-10 before:rounded-xl before:w-full before:h-16 before:bg-gradient-to-r before:from-[#9572FC] before:via-[#43E7AD] before:to-[#E1D55D]`,
    },
  },
}

function App() {
  return (
    <div className={styles.wrapper}>
      <img src={logoEsports} alt="logo/nlw-eSports" />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>

      <div className={styles.gamesAds.wrapper}>
        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <a href="" className={styles.gamesAds.card.anchorCardContainer}>
          <img src="/assets/game1.png" alt="game/game1" />
          <div className={styles.gamesAds.card.infoOfCardWithOverlay}>
            <strong className={styles.gamesAds.card.gameTitle}>
              League of Legends
            </strong>
            <span className={styles.gamesAds.card.adsQuantity}>4 anúncios</span>
          </div>
        </a>

        <div className={styles.gamesAds.ads.wrapper}>
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <button className="py-3 hover:bg-violet-600 transition-all duration-200 flex items-center gap-3 px-4 font-medium bg-violet-500 text-white rounded-md">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
