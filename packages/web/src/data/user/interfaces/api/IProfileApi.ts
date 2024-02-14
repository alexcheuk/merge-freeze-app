import { ApiResponse } from '@/infrastructure/api/ApiClient'
import { ProfileDTO } from '../dtos/profile.dto'

export interface IProfileApi {
  get: () => Promise<ApiResponse<ProfileDTO>>
}
