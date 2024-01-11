import { NextFunction, Request, Response } from 'express'
import { UserJWTPayload } from '../dtos/user-jwt-payload'

export type AuthenticatedUser = UserJWTPayload

export interface AuthenticatedRequest extends Request {
  user: UserJWTPayload
}

export type AuthenticatedRequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => void
