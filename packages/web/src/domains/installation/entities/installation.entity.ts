import { IInstallationEntity } from '../interfaces/entities/installation.entity'

interface InstallationConstructor {
  githubUserId: number | null
  githubInstallationId: number | null
  githubConfigurationUrl: string | null
  slackConfigurationUrl: string | null
}

export class Installation implements IInstallationEntity {
  githubUserId: number | null
  githubInstallationId: number | null
  githubConfigurationUrl: string | null
  slackConfigurationUrl: string | null

  constructor(data: InstallationConstructor) {
    this.githubUserId = data.githubUserId
    this.githubInstallationId = data.githubInstallationId
    this.githubConfigurationUrl = data.githubConfigurationUrl
    this.slackConfigurationUrl = data.slackConfigurationUrl
  }

  get isGithubIntegrated() {
    return !!this.githubInstallationId
  }

  get isSlackIntegrated() {
    return !!this.slackConfigurationUrl
  }

  get isInstallationCompleted(): boolean {
    return Boolean(this.githubInstallationId && this.slackConfigurationUrl)
  }
}
