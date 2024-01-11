import { installationModel } from '../models/installation.model'
import { makeInstallationDb } from './installation.db'

export const installationDb = makeInstallationDb({
  InstallationModel: installationModel,
})
