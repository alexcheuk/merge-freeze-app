import { UseCase } from '../../../shared/interfaces/use-case'
import { IInstallationDb } from '../interfaces/data/IInstallationDb'
import { InstallationDTO } from './dtos/installation.dto'
import { mapInstallationEntityToDTO } from './dtos/installation.mappers'

interface Dependency {
  installationDb: IInstallationDb
}

export interface GetInstallationByGithubUserIdInput {
  githubUserId: number
}

export type GetInstallationByGithubUserIdOutput = InstallationDTO

export const makeGetInstallationByGithubUserId = ({
  installationDb,
}: Dependency): UseCase<
  GetInstallationByGithubUserIdInput,
  GetInstallationByGithubUserIdOutput
> => {
  return async ({ githubUserId }) => {
    const installation = await installationDb.getInstallationByGithubUserId(
      githubUserId
    )

    if (!installation) return null

    return mapInstallationEntityToDTO(installation)
  }
}
