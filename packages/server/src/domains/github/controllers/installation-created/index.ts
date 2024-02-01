import { saveInstallationFromGithub } from '../../use-cases'
import { makeInstallationCreatedController } from './installation-created.controller'

export const installationCreatedController = makeInstallationCreatedController({
  saveInstallationFromGithub,
})
