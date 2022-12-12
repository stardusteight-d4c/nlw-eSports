interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
  ads?: Ad[]
}

interface Ad {
  createdAt: string
  discord: string
  userEmail: string
  userImg: string
  gameId: string
  hourEnd: number
  hourStart: number
  id: string
  name: string
  useVoiceChannel: boolean
  weekDays: string
  yearsPlaying: number
}

interface User {
  uid: string
  email: string
  name: string
  img: string
}
