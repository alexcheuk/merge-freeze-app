import { NextFunction, Request, Response } from 'express'
import { AuthenticatedRequest } from '../../domains/auth/interfaces/controllers/auth-controller'

export type Controller = (req: Request) => Promise<any> | any

export type AuthenticatedController = (
  req: AuthenticatedRequest
) => Promise<any> | any

export interface FormattedResponse<T = any> {
  data: T
}

export const makeController = (
  handler: Controller | AuthenticatedController
) => {
  return async (
    req: Request | AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await handler(req as any)

      res.status(200).json({
        data,
      } as FormattedResponse)
    } catch (e) {
      next(e)
    }
  }
}
