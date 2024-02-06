import { Router } from 'express'
import { authMiddleware } from '../auth/middlewares/auth.middleware'
import { mergeFreezeStatusesController } from './controllers/merge-freeze-statuses'

const router = Router()

router.get(
  '/api/merge-freeze-statuses',
  authMiddleware,
  mergeFreezeStatusesController
)

router.get(
  '/api/merge-freeze-statuses/logs',
  authMiddleware,
  (req, res, next) => {}
)

export default router
