import { ApiResponse } from '../../../../infrastructure/api/ApiClient'
import { ProfileDTO } from '../dtos/profile.dto'

export interface IProfileModel {
  get: () => Promise<ApiResponse<ProfileDTO>>
}
