import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes'

dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)

app.use(cors())
app.use(express.json())
app.use('/api/game', router)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`)
})
