import { WebClient } from '@slack/web-api'
import { SlackDb } from './slack.db.interface'
import { SlackInstallation } from './entities/slack-installation.entity'

interface Dependency {
  slackAPI: WebClient
}

export const makeSlackDb = ({ slackAPI }: Dependency): SlackDb => {
  return {
    getInstallationUrl: () => {
      return SlackInstallation.installationUrl()
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
