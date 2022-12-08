import { Router } from 'express'
import { GamesController } from './controllers/game'

const router = Router()

const game = new GamesController()

router.get('/games', game.get)
router.post('/newGame', game.add)

export { router }
