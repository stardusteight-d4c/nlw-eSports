import { Router } from 'express'
import { GameController } from './controllers/game'

const router = Router()

const game = new GameController()

router.get('/games/:page', game.getGames)
router.post('/newGame', game.addNewGame)
router.post('/:id/ads', game.createAdvertisement)
router.get('/ads/:id/ads', game.getAdvertisements)
router.get('/ads/:id/discord', game.getAdvertisementDiscord)
router.get('/getGameByTitle', game.getGameByTitle)
router.get('/searchGameByTitle', game.searchGameByTitle)
router.post('/addGame', game.addGame)
router.put('/updateGame', game.updateGame)
router.delete('/deleteGame', game.deleteGame)
router.delete('/ads/deleteAdvertisement/:id', game.deleteAdvertisement)

export { router }
