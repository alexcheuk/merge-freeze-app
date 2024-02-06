import { ApiResponse } from '@/core/api/ApiClient'
import {
  getOne,
  deleteAll,
  InstallationDTO,
} from '../data-sources/InstallationDataSource'

export interface InstallationModel {
  getInstallation: () => Promise<ApiResponse<InstallationDTO>>
  deleteInstallation: () => Promise<void>
}

export const InstallationModel: InstallationModel = {
  getInstallation: () => {
    return getOne()
  },
  deleteInstallation: () => {
    return deleteAll()
  },
}
