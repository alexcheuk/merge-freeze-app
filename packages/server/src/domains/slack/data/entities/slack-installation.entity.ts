import { Installation } from '@slack/bolt'

export interface SlackInstallationData extends Installation<'v2'> {}

const INSTALLATION_SCOPES = [
  'channels:read',
  'chat:write',
  'commands',
  'groups:read',
  'im:history',
  'incoming-webhook',
  'users:read',
  'channels:join',
]

export class SlackInstallation {
  team: SlackInstallationData['team']
  enterprise: SlackInstallationData['enterprise']
  user: SlackInstallationData['user']
  bot?: SlackInstallationData['bot']
  incomingWebhook?: SlackInstallationData['incomingWebhook']
  appId?: SlackInstallationData['appId']
  tokenType?: SlackInstallationData['tokenType']
  enterpriseUrl?: SlackInstallationData['enterpriseUrl']
  isEnterpriseInstall?: SlackInstallationData['isEnterpriseInstall']
  authVersion?: SlackInstallationData['authVersion']
  metadata?: SlackInstallationData['metadata']

  constructor(data: SlackInstallationData) {
    this.team = data['team']
    this.enterprise = data['enterprise']
    this.user = data['user']
    this.bot = data['bot']
    this.incomingWebhook = data['incomingWebhook']
    this.appId = data['appId']
    this.tokenType = data['tokenType']
    this.enterpriseUrl = data['enterpriseUrl']
    this.isEnterpriseInstall = data['isEnterpriseInstall']
    this.authVersion = data['authVersion']
    this.metadata = data['metadata']
  }

  static installationUrl() {
    return `https://slack.com/oauth/v2/authorize?client_id=${
      process.env.SLACK_CLIENT_ID
    }&scope=${INSTALLATION_SCOPES.join(',')}`
  }
}
