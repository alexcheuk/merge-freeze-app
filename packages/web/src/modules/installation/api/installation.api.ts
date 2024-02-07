import { IInstallationApi } from '../interfaces/api/IInstallationApi'
import { IInstallationModel } from '../interfaces/models/IInstallationModel'

interface Dependency {
  installationModel: IInstallationModel
}

export const makeInstallationApi = ({
  installationModel,
}: Dependency): IInstallationApi => {
  return {
    get: () => {
      return installationModel.getOne()
    },
    delete: () => {
      return installationModel.deleteAll()
    },
  }
}
