import * as slackInteractivesController from '../controllers/slack.interactives'

module.exports = (app) => {
  app.use('/slack/events', slackInteractivesController.onEvents)
  app.use('/slack/actions', slackInteractivesController.onActions)
}
