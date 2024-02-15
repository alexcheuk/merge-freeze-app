import { Router } from 'express'
import { verifyGithubPayload } from './middlewares/verify-github-payload.middleware'

import { eventsController, installAppController } from './controllers'

const router = Router()

router.get('/github/install', installAppController)
router.post('/github/events', verifyGithubPayload, eventsController)

export default router
