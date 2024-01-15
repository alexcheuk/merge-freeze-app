import { Installation } from '../../data/entities/installation.entity'
import { InstallationDTO } from './installation.dto'

export const mapInstallationEntityToDTO = (
  entity: Installation
): InstallationDTO => {
  return {
    githubInstallationId: entity.githubInstallationId || null,
    githubConfigurationUrl: entity.githubInstallationId
      ? `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/${entity.githubInstallationId}`
      : null,
    slackConfigurationUrl:
      entity.slackInstallation?.incomingWebhook?.configurationUrl || '',
    isInstallationComplete: entity.isInstallationComplete,
  }
}
