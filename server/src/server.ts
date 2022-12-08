import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
// permitir requisições somente de um endereço
// app.use(cors({
//  origin: 'http://localhost:3000'
// }))

app.use(cors())
app.use(express.json())
app.use('/api/game', router)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
