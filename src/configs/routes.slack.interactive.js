import * as slackInteractivesController from '../controllers/slack.interactives'

module.exports = (app) => {
  app.use('/slack/actions', slackInteractivesController.onActions)
}
