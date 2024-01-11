import { Router } from 'express'
import { verifyGithubPayload } from './middlewares/verify-github-payload.middleware'
import GithubEventsController from './controllers/github.controller'
import { authMiddleware } from '../auth/middlewares/auth.middleware'

const router = Router()

router.post(
  '/github/events',
  verifyGithubPayload,
  GithubEventsController.eventsController
)

router.get('/api/github/test', authMiddleware, async (req, res, next) => {
  try {
  } catch (e) {
    next(e)
  }
})

export default router
