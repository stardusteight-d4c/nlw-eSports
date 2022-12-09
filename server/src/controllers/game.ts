import { Request, Response } from 'express'
import { prisma } from '../database/prismaClient'
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string'

export class GameController {
  async get(req: Request, res: Response) {
    const games = await prisma.game.findMany({
      include: { _count: { select: { ads: true } } },
    })
    return res.status(200).json(games)
  }

  async addNewGame(req: Request, res: Response) {
    const { title, bannerUrl } = req.body
    await prisma.game
      .create({ data: { title, bannerUrl } })
      .then((game) => res.status(201).json(game))
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          status: false,
          msg: error,
        })
      })
  }

  async createAdvertisement(req: Request, res: Response) {
    const gameId = req.params.id
    const body = req.body

    await prisma.ad
      .create({
        data: {
          gameId,
          name: body.name,
          yearsPlaying: body.yearsPlaying,
          discord: body.discord,
          weekDays: body.weekDays.join(','),
          hourStart: convertHourStringToMinutes(body.hourStart),
          hourEnd: convertHourStringToMinutes(body.hourEnd),
          useVoiceChannel: body.useVoiceChannel,
        },
      })
      .then((ad) => res.status(201).json(ad))
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          status: false,
          msg: error,
        })
      })
  }

  async getAdvertisements(req: Request, res: Response) {
    try {
      const gameId = req.params.id
      const ads = await prisma.ad.findMany({
        select: {
          id: true,
          name: true,
          weekDays: true,
          yearsPlaying: true,
          hourStart: true,
          hourEnd: true,
          useVoiceChannel: true,
        },
        where: {
          gameId: gameId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return res.json(
        ads.map((ad) => {
          return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
          }
        })
      )
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        status: false,
        msg: error,
      })
    }
  }

  async getAdvertisementDiscord(req: Request, res: Response) {
    const adId = req.params.id

    await prisma.ad
      .findUniqueOrThrow({
        select: {
          discord: true,
        },
        where: {
          id: adId,
        },
      })
      .then((ad) =>
        res.json({
          discord: ad.discord,
        })
      )
      .catch((error) => {
        console.error(error)
        return res.status(500).json({
          status: false,
          msg: error,
        })
      })
  }
}
