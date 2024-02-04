import { ApiClient, ApiResponse } from '@/core/api/ApiClient'
import { useQuery } from '@tanstack/react-query'
import { formatRelative } from 'date-fns'

export const useGetRepoStatuses = () => {
  const { data: statuses, isLoading } = useQuery({
    queryKey: ['get-repo-statuses'],
    queryFn: () => {
      return ApiClient.get<
        ApiResponse<{
          [repo: string]: {
            repoOwner: string
            repoName: string
            source: string
            requesterId: string
            requester: string
            reason: string
            isFrozen: boolean
            datetime: Date
          }
        }>
      >('/api/merge-freeze-statuses').then((res) => res.data.data)
    },
  })

  const repoStatuses = Object.keys(statuses || {}).map((fullRepo) => {
    return {
      repoFullName: fullRepo,
      lastModified: statuses?.[fullRepo]?.datetime
        ? formatRelative(statuses?.[fullRepo]?.datetime, new Date())
        : 'Never',
      isFrozen: statuses?.[fullRepo]?.isFrozen || false,
    }
  })

  return {
    repoStatuses,
    isLoading,
  }
}
