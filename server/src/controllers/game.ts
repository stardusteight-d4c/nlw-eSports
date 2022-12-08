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

// app.get('/games', async (request, response) => {
//   const games = await prisma.game.findMany({
//     include: {
//       _count: {
//         select: {
//           ads: true,
//         },
//       },
//     },
//   })
//   return response.json(games)
// })

// app.get('/games/:id/ads', async (request, response) => {
//   const gameId = request.params.id

//   const ads = await prisma.ad.findMany({
//     select: {
//       id: true,
//       name: true,
//       weekDays: true,
//       yearsPlaying: true,
//       hourStart: true,
//       hourEnd: true,
//       useVoiceChannel: true,
//     },
//     where: {
//       gameId: gameId,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   })

//   return response.json(
//     ads.map((ad) => {
//       return {
//         ...ad,
//         weekDays: ad.weekDays.split(','),
//         hourStart: convertMinutesToHourString(ad.hourStart),
//         hourEnd: convertMinutesToHourString(ad.hourEnd),
//       }
//     })
//   )
// })

// app.get('/ads/:id/discord', async (request, response) => {
//   const adId = request.params.id

//   const ad = await prisma.ad.findUniqueOrThrow({
//     select: {
//       discord: true,
//     },
//     where: {
//       id: adId,
//     },
//   })

//   return response.json({
//     discord: ad.discord,
//   })
// })

// app.post('/games/:id/ads', async (request, response) => {
//   const gameId = request.params.id
//   const body = request.body

//   const ad = await prisma.ad.create({
//     data: {
//       gameId,
//       name: body.name,
//       yearsPlaying: body.yearsPlaying,
//       discord: body.discord,
//       weekDays: body.weekDays.join(','),
//       hourStart: convertHourStringToMinutes(body.hourStart),
//       hourEnd: convertHourStringToMinutes(body.hourEnd),
//       useVoiceChannel: body.useVoiceChannel,
//     },
//   })

//   return response.status(201).json(ad)
// })