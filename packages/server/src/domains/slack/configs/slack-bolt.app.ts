import SlackBolt, { Installation, LogLevel } from '@slack/bolt'
import { installationDb } from '../../installation/data-access'
import SlackController from '../controllers/slack.controller'

const { App, ExpressReceiver } = SlackBolt

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: [
    'channels:read',
    'chat:write',
    'commands',
    'groups:read',
    'im:history',
    'incoming-webhook',
    'users:read',
    'channels:join',
  ],
  dispatchErrorHandler: async ({ error, logger, response }) => {
    logger.error(`dispatch error: ${error}`)
  },
  processEventErrorHandler: async ({ error, logger, response }) => {
    logger.error(`processEvent error: ${error}`)
    return true
  },
  unhandledRequestHandler: async ({ logger, response }) => {
    logger.info(
      'Acknowledging this incoming request because 2 seconds already passed...'
    )
  },
  installationStore: {
    storeInstallation: async () => {},
    fetchInstallation: async (installQuery) => {
      const installation = await installationDb.getInstallationBySlackTeamId(
        installQuery.teamId as string
      )

      return installation?.slackInstallation as Installation<'v2'>
    },
  },
  redirectUri: 'http://mergefreeze.local/auth/slack/callback',
  installerOptions: {
    stateVerification: false,
    redirectUriPath: '/auth/slack/callback',
    callbackOptions: {
      afterInstallation: async (installation, ...args) => {
        return await SlackController.slackInstallationCallback(
          installation as Installation<'v2'>,
          ...args
        )
      },
    },
  },
  logLevel: LogLevel.DEBUG,
})

const app = new App({
  receiver,
})

export { receiver, app }
