import {
  Installation,
  InstallationModelSchema,
} from '../models/installation-model'

export interface InstallationDb {
  upsertGithubInstallation: (
    githubUserId: InstallationModelSchema['githubUserId'],
    githubInstallationId: InstallationModelSchema['githubInstallationId'],
    repos: InstallationModelSchema['installedRepos']
  ) => Promise<void>

  upsertSlackIntegration: (
    githubUserId: InstallationModelSchema['githubUserId'],
    data: {
      slackTeamId: InstallationModelSchema['slackTeamId']
      slackInstallation: InstallationModelSchema['slackInstallation']
    }
  ) => Promise<void>

  getInstallationByGithubInstallationId: (
    githubUserId: InstallationModelSchema['githubInstallationId']
  ) => Promise<Installation | null>

  getInstallationByGithubUserId: (
    githubUserId: InstallationModelSchema['githubUserId']
  ) => Promise<Installation | null>

  getInstallationBySlackTeamId: (
    slackTeamId: InstallationModelSchema['slackTeamId']
  ) => Promise<Installation | null>

  deleteAllInstallationByGithubUserId: (
    githubUserId: InstallationModelSchema['githubUserId']
  ) => Promise<void>
}
