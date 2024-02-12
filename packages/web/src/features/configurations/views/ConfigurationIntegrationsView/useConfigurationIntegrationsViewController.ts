import {
  deleteInstallation,
  getInstallation,
} from '@/domains/installation/use-cases'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useConfigurationIntegrationsViewController = () => {
  const { data: installation, isLoading } = useQuery({
    queryKey: ['get-installation-integrations'],
    queryFn: () => {
      return getInstallation()
    },
  })

  const { mutate } = useMutation({
    mutationFn: () => {
      return deleteInstallation()
    },
  })

  const removeInstallation = async () => {
    await mutate()

    window.location.reload()
  }

  const isGithubConnected = !!installation?.githubConfigurationUrl
  const isSlackConnected = !!installation?.slackConfigurationUrl

  const githubStatusText = isGithubConnected ? 'Connected' : 'Required'
  const slackStatusText = isSlackConnected ? 'Connected' : 'Required'

  return {
    installation,
    removeInstallation,
    isLoading,
    isGithubConnected,
    isSlackConnected,
    githubStatusText,
    slackStatusText,
  }
}
