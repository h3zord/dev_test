import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app, AppDataSource } from '../../..'
import { makeCreateUserUseCase } from '../../../use-cases/factories/make-create-user-use-case'

describe('Find user by email (e2e)', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('should be able to find a user by email', async () => {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    const response = await request(app).get('/users').query({
      email: 'test@test.com',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.email).toEqual('test@test.com')
  })
})
