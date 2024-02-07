export interface IInstallationEntity {
  githubUserId: number | null
  githubInstallationId: number | null
  githubConfigurationUrl: string | null
  slackConfigurationUrl: string | null
  isGithubIntegrated: boolean
  isSlackIntegrated: boolean
  isInstallationCompleted: boolean
}
