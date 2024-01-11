import { getOne, deleteAll } from '../data-sources/InstallationDataSource'

export const InstallationModel = {
  getInstallation: () => {
    return getOne()
  },
  deleteInstallation: () => {
    return deleteAll()
  },
}
