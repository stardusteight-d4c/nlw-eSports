interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface User {
  uid: string
  email: string
  name: string
}
