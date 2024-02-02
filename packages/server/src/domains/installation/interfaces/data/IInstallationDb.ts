import { Installation } from '../../data/entities/installation.entity'

export interface IInstallationDb {
  upsertGithubInstallation: (
    githubUserId: number,
    githubInstallationId: number,
    repos: Installation['installedRepos']
  ) => Promise<void>

  upsertSlackIntegration: (
    githubUserId: Installation['githubUserId'],
    data: {
      slackTeamId: Installation['slackTeamId']
      slackInstallation: Installation['slackInstallation']
    }
  ) => Promise<void>

  getInstallationByGithubInstallationId: (
    githubInstallationId: Installation['githubInstallationId']
  ) => Promise<Installation | null>

  getInstallationByGithubUserId: (
    githubUserId: Installation['githubUserId']
  ) => Promise<Installation | null>

  getInstallationBySlackTeamId: (
    slackTeamId: Installation['slackTeamId']
  ) => Promise<Installation | null>

  deleteAllInstallationByGithubUserId: (
    githubUserId: Installation['githubUserId']
  ) => Promise<void>

  updateAllowedChannels: (
    githubInstallationId: Installation['githubInstallationId'],
    allowedChannels: string[]
  ) => Promise<void>

  updateInstalledRepos: (
    githubInstallationId: Installation['githubInstallationId'],
    repos: Installation['installedRepos']
  ) => Promise<void>
}
