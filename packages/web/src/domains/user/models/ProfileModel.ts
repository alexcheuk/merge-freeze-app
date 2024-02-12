import { ApiClient, ApiResponse } from '../../../infrastructure/api/ApiClient'

export interface ProfileDTO {
  name: string
  email?: string
  avatarUrl?: string
}

export const ProfileModel = {
  getProfile: () => {
    return ApiClient.get<ApiResponse<ProfileDTO>>('/api/profile').then(
      (res) => res.data
    )
  },
}
