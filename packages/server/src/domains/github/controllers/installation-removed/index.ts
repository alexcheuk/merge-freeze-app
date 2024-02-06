import { makeInstallationRemovedController } from './installation-removed.controller'
import { syncInstalledRepos } from '../../use-cases'

export const installationRemovedController = makeInstallationRemovedController({
  syncInstalledRepos,
})
