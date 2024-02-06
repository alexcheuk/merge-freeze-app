import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { ISaveInstallationFromGithubUseCase } from '../../interfaces/use-cases/ISaveInstallationFromGithubUseCase'

interface Dependency {
  installationDb: IInstallationDb
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
