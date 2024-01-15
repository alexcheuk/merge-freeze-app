import { WebClient } from '@slack/web-api'
import { makeSlackDb } from './slack.db'

const SlackAPI = new WebClient()

const slackApi = makeSlackDb({
  slackAPI: SlackAPI,
})

export { slackApi }
