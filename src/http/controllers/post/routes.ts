import express from 'express'
import { createPost } from './create-post'
import { findPostById } from './find-post-by-id'
import { findManyPostsByUserId } from './find-many-posts-by-user-id'

export const postRouters = express.Router()

postRouters.post('/posts', createPost)
postRouters.get('/posts/:id', findPostById)
postRouters.get('/posts', findManyPostsByUserId)
