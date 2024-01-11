import { useQuery } from '@tanstack/react-query'
import { useInstallationViewModel } from '../../../domains/installation/view-models/InstallationViewModel'

export const useManageViewController = () => {
  const { getInstallation, deleteInstallation } = useInstallationViewModel()

  const {
    data: installation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['get-installation'],
    queryFn: () => {
      return getInstallation()
    },
  })

  const removeInstallation = async () => {
    await deleteInstallation()

    window.location.reload()
  }

  const githubConfigurationUrl = installation?.githubConfigurationUrl
  const slackConfigurationUrl = installation?.slackConfigurationUrl

  const showOnboardingSteps = !installation?.isInstallationCompleted
  const isMissingGithubInstallation = !installation?.githubInstallationId
  const isMissingSlackIntegration = !installation?.isSlackIntegrated

  return {
    removeInstallation,
    showOnboardingSteps,
    isMissingGithubInstallation,
    isMissingSlackIntegration,
    githubConfigurationUrl,
    slackConfigurationUrl,
    installation: installation,
    isLoading,
    error,
  }
}
