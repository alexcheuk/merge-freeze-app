import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteInstallation, getInstallation } from '../domain/use-cases'

export const useInstallationViewModel = () => {
  const useGetInstallation = () => {
    return useQuery({
      queryKey: ['get-installation'],
      queryFn: () => {
        return getInstallation()
      },
    })
  }

  const useDeleteInstallation = () => {
    return useMutation({
      mutationFn: () => {
        return deleteInstallation()
      },
    })
  }

  return {
    useGetInstallation,
    useDeleteInstallation,
  }
}
