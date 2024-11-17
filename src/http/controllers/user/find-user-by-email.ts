import { Request, Response } from 'express'
import { z } from 'zod'
import { makeFindUserByEmailUseCase } from '../../../use-cases/factories/make-find-user-by-email-use-case'

export async function findUserByEmail(req: Request, res: Response) {
  const findUserByEmailQuerySchema = z.object({
    email: z.string().email(),
  })

  const { email } = findUserByEmailQuerySchema.parse(req.query)

  const findUserByEmailUseCase = makeFindUserByEmailUseCase()

  const { user } = await findUserByEmailUseCase.execute({ email })

  return res.status(200).json({ user })
}
