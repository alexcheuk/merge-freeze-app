import { syncInstalledRepos } from '../../use-cases'
import { makeInstallationAddedController } from './installation-added.controller'

export const installationAddedController = makeInstallationAddedController({
  syncInstalledRepos,
})
