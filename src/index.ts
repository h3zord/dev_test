import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'

import { userRouters } from './http/controllers/user/routes'
import { zodErrorsMiddleware } from './http/middlewares/zod-errors'

export const app = express()

app.use(express.json())

// app.post('/users', async (req, res) => {})

// app.post('/posts', async (req, res) => {})

app.use(userRouters)

app.use(zodErrorsMiddleware)
