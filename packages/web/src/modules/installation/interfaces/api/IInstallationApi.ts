import { ApiResponse } from '@/core/api/ApiClient'
import { IInstallationDTO } from '../dtos/IInstallationDTO'

export interface IInstallationApi {
  get: () => Promise<ApiResponse<IInstallationDTO>>
  delete: () => Promise<void>
}
