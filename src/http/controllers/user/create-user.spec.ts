import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app, AppDataSource } from '../../..'
import { QueryRunner } from 'typeorm'

let queryRunner: QueryRunner

describe('Create user (e2e)', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()

    queryRunner = AppDataSource.createQueryRunner()

    await queryRunner.startTransaction()
  })

  afterAll(async () => {
    if (queryRunner) {
      await queryRunner.rollbackTransaction() // Reverte as alterações
      await queryRunner.release() // Libera o query runner
    }

    await AppDataSource.destroy()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new user with invalid informations', async () => {
    const response = await request(app).post('/users').send({
      firstName: '',
      lastName: '',
      email: '',
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error')
  })
})
