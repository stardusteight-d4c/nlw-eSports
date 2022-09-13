import express from 'express'

const app = express()

// http://localhost:3333/ads
app.get('/ads', (request, response) => {
  return response.json([
    {
      id: 1,
      name: 'Anúncio 1',
    },
    {
      id: 2,
      name: 'Anúncio 2',
    },
    {
      id: 3,
      name: 'Anúncio 3',
    },
    {
      id: 4,
      name: 'Anúncio 4',
    },
  ])
})

/**
 * A aplicação fica ouvindo novas requisições,
 * até que o usuário encerre a execução da app.
 */
app.listen(3333)
