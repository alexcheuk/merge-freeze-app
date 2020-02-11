import * as githubController from '../controllers/github.events'
import * as slackController from '../controllers/slack'

import { verifyGithubPayload } from '../middlewares/middlewares.github'
import { verifySignature, isAllowedChannel } from '../middlewares/middlewares.slack'

module.exports = (app) => {
  app.post('/github', verifyGithubPayload, githubController.postEvent)

  app.post('/slack/merge-freeze', verifySignature, isAllowedChannel, slackController.postMergeFreeze)
  app.post('/slack/merge-unfreeze', verifySignature, isAllowedChannel, slackController.postMergeUnfreeze)
  app.post('/slack/merge-unfreeze-pr', verifySignature, isAllowedChannel, slackController.postMergeUnfreezePR)
}
