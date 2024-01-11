import './configs/passport.github'
import { Router } from 'express'
import AuthController from './controllers/auth.controller'

const router = Router()

router.get('/auth/github', AuthController.authenticateWithGithub)
router.get('/auth/github/callback', AuthController.githubAuthCallback)
router.get('/auth/logout', AuthController.logout)

export default router
