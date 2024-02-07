import { ApiResponse } from '@/core/api/ApiClient'
import { IInstallationDTO } from '../dtos/IInstallationDTO'

export interface IInstallationModel {
  getOne: () => Promise<ApiResponse<IInstallationDTO>>
  deleteAll: () => Promise<void>
}
