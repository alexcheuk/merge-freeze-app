import { IInstallationDb } from '../interfaces/data/IInstallationDb'
import { IGetInstallationByGithubUserIdUseCase } from '../interfaces/use-cases/IGetInstallationByGithubUserIdUseCase'
import { mapInstallationEntityToDTO } from './dtos/installation.mappers'

interface Dependency {
  installationDb: IInstallationDb
}

export const makeGetInstallationByGithubUserId = ({
  installationDb,
}: Dependency): IGetInstallationByGithubUserIdUseCase => {
  return async ({ githubUserId }) => {
    const installation = await installationDb.getInstallationByGithubUserId(
      githubUserId
    )

    if (!installation) return null

    return mapInstallationEntityToDTO(installation)
  }
}
