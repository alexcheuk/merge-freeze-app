import { InstallationDTO } from '../interfaces/dtos/installation-dto'
import { Installation } from '../interfaces/models/installation-model'

const mapModelToDTO = (model: Installation): InstallationDTO => {
  return {
    githubInstallationId: model.githubInstallationId || null,
    githubConfigurationUrl: model.githubInstallationId
      ? `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/${model.githubInstallationId}`
      : null,
    slackConfigurationUrl:
      model.slackInstallation?.incomingWebhook?.configurationUrl || '',
  }
}

export { mapModelToDTO }
