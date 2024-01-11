import { installationDb } from '../../installation/data-access'
import { makeSaveInstallationFromGithub } from './save-installation-from-github'

const saveInstallationFromGithub = makeSaveInstallationFromGithub({
  installationDb,
})

export { saveInstallationFromGithub }
