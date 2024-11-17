import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'

import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Post } from './entity/Post'
import { userRouters } from './http/controllers/user/routes'
import { zodErrorsMiddleware } from './http/middlewares/zod-errors'

export const app = express()
app.use(express.json())

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test_db',
  entities: [User, Post],
  synchronize: true,
})

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// const initializeDatabase = async () => {
//   await wait(1000)
//   try {
//     await AppDataSource.initialize()
//     console.log('Data Source has been initialized!')
//   } catch (err) {
//     console.error('Error during Data Source initialization:', err)
//     process.exit(1)
//   }
// }

// initializeDatabase()

// app.post('/users', async (req, res) => {})

// app.post('/posts', async (req, res) => {})

app.use(userRouters)

app.use(zodErrorsMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
