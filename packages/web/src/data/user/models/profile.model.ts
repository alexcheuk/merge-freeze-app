import { ApiClient, ApiResponse } from '../../../infrastructure/api/ApiClient'
import { ProfileDTO } from '../interfaces/dtos/profile.dto'
import { IProfileModel } from '../interfaces/models/IProfileModel'

export const ProfileModel: IProfileModel = {
  get: async () => {
    return ApiClient.get<ApiResponse<ProfileDTO>>('/api/profile').then(
      (res) => res.data
    )
  },
}
