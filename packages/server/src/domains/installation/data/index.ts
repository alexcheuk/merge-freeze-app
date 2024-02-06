import { makeInstallationDb } from './installation.db'
import { InstallationModel } from './models/installation.model'

export const installationDb = makeInstallationDb({
  InstallationModel: InstallationModel,
})
