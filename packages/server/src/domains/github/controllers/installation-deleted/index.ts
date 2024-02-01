import { uninstall } from '../../../installation'
import { makeInstallationDeletedController } from './installation-deleted.controller'

export const installationDeletedController = makeInstallationDeletedController({
  uninstall: uninstall,
})
