import './styles/main.css'
import logoEsports from '/assets/logo-esports.svg'

const styles = {
  container: `max-w-[1344px] mx-auto flex flex-col justify-center items-center mt-12 2xl:my-20`,
  mainTitle: `2xl:text-6xl text-5xl text-white font-black mt-12 2xl:mt-20`,
  nlwGradient: `bg-gradient-to-r from-[#9572FC] via-[#43E7AD] to-[#E1D55D] bg-clip-text text-transparent`,
  gamesAdsContainer: `grid grid-cols-6 gap-6 mt-10 2xl:mt-16 px-16 2xl:px-0`,
}

function App() {
  return (
    <div className={styles.container}>
      <img src={logoEsports} alt="logo/nlw-eSports" />
      <h1 className={styles.mainTitle}>
        Seu <span className={styles.nlwGradient}>duo</span> está aqui.
      </h1>

      <div className={styles.gamesAdsContainer}>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/assets/game1.png" alt="game/game1" />
          <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 inset-x-0 bg-gradient-to-b from-black/0 via-black/70 to-black/90">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="bg-[#2a2634] px-8 py-6 self-stretch mt-8 rounded-lg"></div>
    </div>
  )
}

export default App
