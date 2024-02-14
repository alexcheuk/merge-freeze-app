import { ApiClient, ApiResponse } from '../../../infrastructure/api/ApiClient'
import { IInstallationDTO } from '../interfaces/dtos/IInstallationDTO'
import { IInstallationModel } from '../interfaces/models/IInstallationModel'

export const InstallationModel: IInstallationModel = {
  getOne: async () => {
    return ApiClient.get<ApiResponse<IInstallationDTO>>(
      '/api/installation'
    ).then((res) => res.data)
  },

  deleteAll: async () => {
    return ApiClient.delete<any, void>('/api/installation')
  },
}
