import { getInstallation } from '@/domains/installation/use-cases'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

export const useConfigurationViewController = () => {
  const navigate = useNavigate()
  const location = useLocation()

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

  const showOnboardingSteps = !installation?.isInstallationCompleted

  if (showOnboardingSteps && location.pathname !== '/manage/integrations') {
    navigate('/manage/integrations')
  }

  return {
    showOnboardingSteps,
    isLoading,
    error,
  }
}
