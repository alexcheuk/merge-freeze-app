import { Request, Response } from 'express'

export const installApp = (req: Request, res: Response) => {
  return res.redirect(
    `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`
  )
}
