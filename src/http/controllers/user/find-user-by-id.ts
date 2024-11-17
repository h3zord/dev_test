import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindUserByIdUseCase } from '../../../use-cases/factories/make-find-user-by-id-use-case'

export async function findUserById(req: Request, res: Response) {
  const findUserByIdParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = findUserByIdParamsSchema.parse(req.params)

  const findUserByIdUseCase = makeFindUserByIdUseCase()

  const { user } = await findUserByIdUseCase.execute({ id })

  return res.status(200).json({ user })
}
