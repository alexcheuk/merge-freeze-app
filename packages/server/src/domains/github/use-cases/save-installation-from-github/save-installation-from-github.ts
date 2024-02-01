import { InstallationDb } from '../../../installation/data/installation.db.interface'
import { ISaveInstallationFromGithubUseCase } from '../../interfaces/use-cases/ISaveInstallationFromGithubUseCase'

interface Dependency {
  installationDb: InstallationDb
}

export const makeSaveInstallationFromGithub = ({
  installationDb,
}: Dependency): ISaveInstallationFromGithubUseCase => {
  return ({ githubUserId, githubInstallationId, repos }) => {
    return installationDb.upsertGithubInstallation(
      githubUserId,
      githubInstallationId,
      repos
    )
  }
}
