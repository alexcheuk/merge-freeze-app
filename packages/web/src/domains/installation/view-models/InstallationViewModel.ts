import { InstallationDTO } from '../../../data/data-sources/InstallationDataSource'
import { InstallationModel } from '../../../data/models/InstallationModel'

class InstallationViewModel {
  installation: InstallationDTO

  constructor(installation: InstallationDTO) {
    this.installation = {
      ...installation,
    }
  }

  get githubUserId() {
    return this.installation.githubUserId
  }

  get githubInstallationId() {
    return this.installation.githubInstallationId
  }

  get slackConfigurationUrl() {
    return this.installation.slackConfigurationUrl
  }

  get githubConfigurationUrl() {
    return this.installation.githubConfigurationUrl
  }

  get isGithubIntegrated() {
    return !!this.installation.githubInstallationId
  }

  get isSlackIntegrated() {
    return !!this.installation.slackConfigurationUrl
  }

  get isInstallationCompleted(): boolean {
    const { githubInstallationId, slackConfigurationUrl } = this.installation

    return Boolean(githubInstallationId && slackConfigurationUrl)
  }
}

export const useInstallationViewModel = () => {
  const getInstallation = () => {
    return InstallationModel.getInstallation()
      .then((res) => res.data)
      .then((installation) => {
        return new InstallationViewModel(installation)
      })
  }

  const deleteInstallation = () => {
    return InstallationModel.deleteInstallation()
  }

  return {
    getInstallation,
    deleteInstallation,
  }
}
