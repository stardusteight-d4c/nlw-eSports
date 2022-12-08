import { Request, Response } from 'express'
import { prisma } from '../database/prismaClient'

export class GamesController {
  async get(req: Request, res: Response) {
    const games = await prisma.game.findMany({
      include: { _count: { select: { ads: true } } },
    })
    return res.status(200).json(games)
  }

  async add(req: Request, res: Response) {
    const { title, bannerUrl } = req.body
    await prisma.game
      .create({ data: { title, bannerUrl } })
      .then((game) => res.status(201).json(game))
      .catch((error) => console.log(error))
  }
}
