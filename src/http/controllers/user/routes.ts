import express from 'express'
import { createUser } from './create-user'

export const userRouters = express.Router()

userRouters.post('/users', createUser)
