import express from 'express'
import { createPost } from './create-post'

export const postRouters = express.Router()

postRouters.post('/posts', createPost)
