import passport from 'passport'

import * as githubController from '../controllers/github.events'
import * as slackController from '../controllers/slack'

import { verifyGithubPayload } from '../middlewares/middlewares.github'
import { verifySignature, isAllowedChannel } from '../middlewares/middlewares.slack'
import { isLoggedIn } from '../middlewares/middlewares.app'
import { getAuthSlackCallback } from '../controllers/auth.slack'
import { getAuthGithub, getAuthGithubCallback } from '../controllers/auth.github'
import { getAppManage } from '../controllers/app.manage'

module.exports = (app) => {
  app.post('/github', verifyGithubPayload, githubController.postEvent)

  app.post('/slack/merge-freeze', verifySignature, isAllowedChannel, slackController.postMergeFreeze)
  app.post('/slack/merge-unfreeze', verifySignature, isAllowedChannel, slackController.postMergeUnfreeze)
  app.post('/slack/merge-unfreeze-pr', verifySignature, isAllowedChannel, slackController.postMergeUnfreezePR)

  app.get('/auth/slack/callback', isLoggedIn, getAuthSlackCallback)

  app.get('/auth/github', getAuthGithub)
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), getAuthGithubCallback)

  app.get('/manage', isLoggedIn, getAppManage)

  app.get('*', (req, res) => res.send(404))
}
