import { Router } from 'express'
import '../auth/configs/passport.github'
import { authMiddleware } from '../auth/middlewares/auth.middleware'
import UserController from './controller/user.controller'

const router = Router()

router.get('/api/profile', authMiddleware, UserController.getProfile)

export default router
