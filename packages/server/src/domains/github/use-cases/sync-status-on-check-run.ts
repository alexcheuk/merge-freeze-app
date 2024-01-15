import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { GithubAPI } from '../data-access/github.api'
import { buildFrozenGithubCheck } from '../utils/build-frozen-github-check'
import { buildUnfrozenGithubCheck } from '../utils/build-unfrozen-github-check'

interface Dependency {
  installationDb: InstallationDb
  mergeFreezeStatusDb: MergeFreezeStatusDb
  makeGithubDb: GithubAPI
}

export const makeSyncStatusOnCheckRun = ({
  installationDb,
  mergeFreezeStatusDb,
  makeGithubDb,
}: Dependency) => {
  return async ({
    githubInstallationId,
    ref,
    owner,
    repo,
  }: {
    githubInstallationId: number
    ref: string
    owner: string
    repo: string
  }) => {
    const installation =
      await installationDb.getInstallationByGithubInstallationId(
        githubInstallationId
      )

    const latestStatus = await mergeFreezeStatusDb.getLatestStatus(owner, repo)

    if (!installation || !installation.githubInstallationId) return

    const gh = makeGithubDb({
      installationId: installation.githubInstallationId,
      owner,
      repo,
    })

    gh.createCheck(
      ref,
      latestStatus.isFrozen
        ? buildFrozenGithubCheck({
            reason: latestStatus.reason,
            requesterName: latestStatus.requester,
          })
        : buildUnfrozenGithubCheck({
            reason: latestStatus.reason,
            requesterName: latestStatus.requester,
          })
    )
  }
}
