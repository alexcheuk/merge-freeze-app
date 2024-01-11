import { WebClient } from '@slack/web-api'
import { SlackAPI } from '../interfaces/data-access/slack.api'

interface Dependency {
  generateInstallationUrl: (scopes: string[]) => Promise<string>
  slackAPI: WebClient
}

export const makeSlackAPI = ({
  generateInstallationUrl,
  slackAPI,
}: Dependency): SlackAPI => {
  return {
    getInstallationUrl: async (scopes) => {
      return await generateInstallationUrl(scopes)
    },
    joinChannel: async ({ token, channel }) => {
      return slackAPI.conversations.join({
        token,
        channel,
      })
    },
    postMessage: ({ token, message }) => {
      return slackAPI.chat.postMessage({
        token,
        ...message,
      })
    },
    uninstall: ({ token }) => {
      return slackAPI.apps.uninstall({
        token,
        client_id: process.env.SLACK_CLIENT_ID || '',
        client_secret: process.env.SLACK_CLIENT_SECRET || '',
      })
    },
  }
}
