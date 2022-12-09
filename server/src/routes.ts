import { Router } from 'express'
import { GameController } from './controllers/game'

const router = Router()

const game = new GameController()

router.get('/games', game.getGames)
router.post('/newGame', game.addNewGame)
router.post('/ads/:id/ads', game.createAdvertisement)
router.get('/ads/:id/ads', game.getAdvertisements)
router.get('/ads/:id/discord', game.getAdvertisementDiscord)
router.get('/:title', game.getGameByTitle)

export { router }
