namespace Express {
  export interface Request {
    user?: import('./domains/auth/interfaces/controllers/auth-controller').AuthenticatedUser
  }
}
