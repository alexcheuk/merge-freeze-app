import { InstallationDb } from '../interfaces/data-access/installation-db'
import { mapModelToDTO } from '../mappers/installation.mappers'

interface Dependency {
  installationDb: InstallationDb
}

export const makeGetInstallationByGithubUserId = ({
  installationDb,
}: Dependency) => {
  return async (githubUserId: number) => {
    const installation = await installationDb.getInstallationByGithubUserId(
      githubUserId
    )

    if (!installation) return null

    return mapModelToDTO(installation)
  }
}
