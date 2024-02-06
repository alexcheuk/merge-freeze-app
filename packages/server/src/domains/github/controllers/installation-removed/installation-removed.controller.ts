import { IInstallationRemovedController } from '../../interfaces/controllers/IInstallationRemovedController'
import { ISyncInstalledReposUseCase } from '../../interfaces/use-cases/ISyncInstalledReposUseCase'

interface Dependency {
  syncInstalledRepos: ISyncInstalledReposUseCase
}

export const makeInstallationRemovedController = ({
  syncInstalledRepos,
}: Dependency): IInstallationRemovedController => {
  return async (event, res) => {
    await syncInstalledRepos({
      githubInstallationId: event.installation.id,
    })

    res.sendStatus(200)
  }
}
