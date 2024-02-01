import { SlackInstallation } from '../../../slack/data/entities/slack-installation.entity'

export interface InstallationRepo {
  owner: string
  repo: string
}

export interface InstallationConstructor {
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
  githubUserId: InstallationConstructor['githubUserId']
  githubInstallationId: InstallationConstructor['githubInstallationId']
  slackTeamId: InstallationConstructor['slackTeamId']
  slackInstallation: InstallationConstructor['slackInstallation']
  installedRepos: InstallationConstructor['installedRepos']
  configuration: InstallationConstructor['configuration']

  constructor(data: InstallationConstructor) {
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

  get canUninstallFromGithub() {
    return !!(this.githubInstallationId && this?.installedRepos?.length)
  }

  get canUninstallFromSlack() {
    return !!this.slackInstallation?.bot?.token
  }
}
