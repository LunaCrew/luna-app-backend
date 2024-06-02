import express, { Application } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import Log from '@lunacrew/logger'
import * as dotenv from 'dotenv'
import passport from 'passport'
import { routes } from './router/routes'
import { errorHandler } from './middleware/errorHandler'
import configurePassport from './util/security/Passport'

dotenv.config({ path: '.env' })

const PORT = process.env.PORT ?? 3000
const app: Application = express()

routes(app)

export const client = new MongoClient(process.env.DB_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const start = () => {
  try {
    configurePassport(passport)

    const corsOptions = {
      origin: '',
      methods: '',
      allowedHeaders: 'Content-Type'
    }

    app
      .use(cors(corsOptions))
      .use(passport.initialize())
      .use(errorHandler)

    app.listen(PORT, () => {
      Log.d(`Running at http://localhost:${PORT}`, 'Server')
    })

  } catch (error) {
    Log.e(`${error}`, 'Error starting server')
  }
}

const connect = async () => {
  try {
    await client.connect()
    await client.db().command({ ping: 1 })
    Log.d('Connected', 'MongoDB')
  } catch (error) {
    await client.close()
    Log.e(`${error}`, 'MongoDB Connection')
  }
}

const collections = {
  users: client.db().collection('users')
}

export { collections }
export default app

start()
connect()
