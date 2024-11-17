import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app, AppDataSource } from '../../..'
import { makeCreateUserUseCase } from '../../../use-cases/factories/make-create-user-use-case'

describe('Find user by id (e2e)', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('should be able to find a user by id', async () => {
    const createUserUseCase = makeCreateUserUseCase()

    const { user } = await createUserUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    const response = await request(app).get(`/users/${user.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.id).toEqual(user.id)
  })
})
