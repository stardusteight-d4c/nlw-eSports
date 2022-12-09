import { Router } from 'express'
import { GameController } from './controllers/game'

const router = Router()

const game = new GameController()

router.get('/games', game.get)
router.post('/newGame', game.addNewGame)
router.post('/games/:id/ads', game.createAdvertisement)
router.get('/games/:id/ads', game.getAdvertisements)
router.get('/ads/:id/discord', game.getAdvertisementDiscord)

export { router }
