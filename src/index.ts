import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './Cors'
import mainRoute from './Todo/MainRouter'
import mongoose from 'mongoose'

dotenv.config()

const app: express.Application = express()
const address: string = String(process.env.PORT)

app.use(cors(corsOptions))
app.use(bodyParser.json())

// maping the application to the api
app.use("/api/", mainRoute)

mongoose.connect(`${String(process.env.DATABASE_HOST) + String(process.env.DATABASE_NAME)}`)

app.listen(address, () => {
    console.log(`starting app on: http://localhost:${address}`)
})

export default app