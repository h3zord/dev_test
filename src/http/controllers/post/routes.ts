import express from 'express'
import { createPost } from './create-post'
import { findPostById } from './find-post-by-id'

export const postRouters = express.Router()

postRouters.post('/posts', createPost)
postRouters.get('/posts/:id', findPostById)
