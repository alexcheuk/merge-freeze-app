import { Router } from 'express'
import { verifyGithubPayload } from './middlewares/verify-github-payload.middleware'

import { eventsController } from './controllers'

const router = Router()

router.post('/github/events', verifyGithubPayload, eventsController)

export default router
