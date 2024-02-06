import { ISyncInstalledReposUseCase } from '../../interfaces/use-cases/ISyncInstalledReposUseCase'
import { IInstallationAddedController } from '../../interfaces/controllers/IInstallationAddedController'

export const makeInstallationAddedController = ({
  syncInstalledRepos,
}: {
  syncInstalledRepos: ISyncInstalledReposUseCase
}): IInstallationAddedController => {
  return async (event, res) => {
    await syncInstalledRepos({
      githubInstallationId: event.installation.id,
    })

    res.sendStatus(200)
  }
}
