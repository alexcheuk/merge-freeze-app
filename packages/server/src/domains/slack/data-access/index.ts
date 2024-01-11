import { WebClient } from '@slack/web-api'
import { makeSlackAPI } from './slack.api'

const SlackAPI = new WebClient()

const slackApi = makeSlackAPI({
  generateInstallationUrl: async (scopes) => {
    return `https://slack.com/oauth/v2/authorize?client_id=${
      process.env.SLACK_CLIENT_ID
    }&scope=${scopes.join(',')}`
  },
  slackAPI: SlackAPI,
})

export { slackApi }
