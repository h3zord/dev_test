import express from 'express'
import { createUser } from './create-user'
import { findUserById } from './find-user-by-id'
import { findUserByEmail } from './find-user-by-email'

export const userRouters = express.Router()

userRouters.post('/users', createUser)
userRouters.get('/users/:id', findUserById)
userRouters.get('/users', findUserByEmail)
