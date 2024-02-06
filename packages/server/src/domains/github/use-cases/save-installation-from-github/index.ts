import { installationDb } from '../../../installation/data'
import { makeSaveInstallationFromGithub } from './save-installation-from-github'

export const saveInstallationFromGithub = makeSaveInstallationFromGithub({
  installationDb,
})
