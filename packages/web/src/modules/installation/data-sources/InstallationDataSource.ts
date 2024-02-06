import { ApiClient, ApiResponse } from '../../../core/api/ApiClient'

export interface InstallationDTO {
  githubUserId: number
  githubInstallationId: number | null
  slackConfigurationUrl: string | null
  githubConfigurationUrl: string | null
}

export const getOne = async () => {
  return ApiClient.get<ApiResponse<InstallationDTO>>('/api/installation').then(
    (res) => res.data
  )
}

export const deleteAll = async () => {
  return ApiClient.delete<any, void>('/api/installation')
}
