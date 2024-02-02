import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { GithubAPI } from '../../data-access/github.api'
import { ISyncInstalledReposUseCase } from '../../interfaces/use-cases/ISyncInstalledReposUseCase'

interface Dependency {
  installationDb: IInstallationDb
  makeGithubApi: GithubAPI
}

export const makeSyncInstalledRepos = ({
  installationDb,
  makeGithubApi,
}: Dependency): ISyncInstalledReposUseCase => {
  return async ({ githubInstallationId }) => {
    const gh = makeGithubApi({
      installationId: githubInstallationId,
      owner: '',
      repo: '',
    })

    const installedRepos = ((await gh.getInstalledRepos()) || []).map(
      (repo) => {
        const [owner, repoName] = repo.full_name.split('/')

        return {
          owner,
          repo: repoName,
        }
      }
    )

    return installationDb.updateInstalledRepos(
      githubInstallationId,
      installedRepos
    )
  }
}
