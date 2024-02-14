import { InstallationModel } from '../models/installation.model'
import { makeInstallationApi } from './installation.api'

export const installationApi = makeInstallationApi({
  installationModel: InstallationModel,
})
