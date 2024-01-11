import { ApiClient, ApiResponse } from '../api/ApiClient'

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
  return ApiClient.delete('/api/installation')
}
