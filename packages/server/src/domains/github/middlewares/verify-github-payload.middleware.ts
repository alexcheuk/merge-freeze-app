import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || ''

const verifySignature = (req: Request) => {
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')
  let trusted = Buffer.from(`sha256=${signature}`, 'ascii')
  let untrusted = Buffer.from(
    req.headers['x-hub-signature-256'] as string,
    'ascii'
  )

  return crypto.timingSafeEqual(trusted, untrusted)
}

export const verifyGithubPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!verifySignature(req)) {
    return res.status(401).send('Mismatched signatures')
  }

  next()
}
