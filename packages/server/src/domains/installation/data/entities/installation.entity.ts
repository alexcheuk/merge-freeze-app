import { SlackInstallation } from '../../../slack/data/entities/slack-installation.entity'

export interface InstallationRepo {
  owner: string
  repo: string
}

export interface InstallationData {
  githubUserId?: number
  githubInstallationId?: number
  slackTeamId?: string
  slackInstallation?: SlackInstallation
  installedRepos?: InstallationRepo[]
  configuration?: {
    allowedChannels?: string[]
    mergeFreezeTemplate?: string
    mergeUnfreezeTemplate?: string
  }
}

export class Installation {
  githubUserId: InstallationData['githubUserId']
  githubInstallationId: InstallationData['githubInstallationId']
  slackTeamId: InstallationData['slackTeamId']
  slackInstallation: InstallationData['slackInstallation']
  installedRepos: InstallationData['installedRepos']
  configuration: InstallationData['configuration']

  constructor(data: InstallationData) {
    this.githubInstallationId = data.githubInstallationId
    this.githubUserId = data.githubUserId
    this.slackTeamId = data.slackTeamId
    this.slackInstallation = data.slackInstallation
    this.installedRepos = data.installedRepos
    this.configuration = data.configuration
  }

  get isInstallationComplete() {
    return !!(this.githubInstallationId && this.slackInstallation)
  }
}
