import { InstallationDb } from '../../installation/data/installation.db.interface'

interface Dependency {
  installationDb: InstallationDb
}

export const makeSaveInstallationFromGithub = ({
  installationDb,
}: Dependency) => {
  return (
    githubUserId: number,
    githubInstallationId: number,
    repos: { owner: string; repo: string }[]
  ) => {
    return installationDb.upsertGithubInstallation(
      githubUserId,
      githubInstallationId,
      repos
    )
  }
}
