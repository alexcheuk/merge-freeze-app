import { getInstallation } from '@/domains/installation/use-cases'
import { useQuery } from '@tanstack/react-query'

export const useConfigurationGeneralViewController = () => {
  const { data: installation, isLoading } = useQuery({
    queryKey: ['get-installation-general'],
    queryFn: () => {
      return getInstallation()
    },
  })

  return {
    installation,
    isLoading,
  }
}
