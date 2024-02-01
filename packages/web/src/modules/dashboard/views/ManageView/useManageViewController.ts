import { useInstallationViewModel } from '@/modules/installation/view-models/InstallationViewModel'

export const useManageViewController = () => {
  const { useGetInstallation, useDeleteInstallation } =
    useInstallationViewModel()

  const { data: installation, isLoading, error } = useGetInstallation()
  const { mutate } = useDeleteInstallation()

  const removeInstallation = async () => {
    await mutate()

    window.location.reload()
  }

  const githubConfigurationUrl = installation?.githubConfigurationUrl
  const slackConfigurationUrl = installation?.slackConfigurationUrl

  const showOnboardingSteps = !installation?.isInstallationCompleted

  return {
    removeInstallation,
    showOnboardingSteps,
    githubConfigurationUrl,
    slackConfigurationUrl,
    installation: installation,
    isLoading,
    error,
  }
}
