import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IMergeFreezeStatusDb } from '../../../merge-freeze-status/interfaces/data-access/IMergeFreezeStatusDb'
import { GithubAPI } from '../../data-access/github.api'
import { ISyncStatusOnCheckRunUseCase } from '../../interfaces/use-cases/ISyncStatusOnCheckRunUseCase'
import { buildFrozenGithubCheck } from '../../utils/build-frozen-github-check'
import { buildUnfrozenGithubCheck } from '../../utils/build-unfrozen-github-check'

interface Dependency {
  installationDb: IInstallationDb
  mergeFreezeStatusDb: IMergeFreezeStatusDb
  makeGithubDb: GithubAPI
}

export const makeSyncStatusOnCheckRun = ({
  installationDb,
  mergeFreezeStatusDb,
  makeGithubDb,
}: Dependency): ISyncStatusOnCheckRunUseCase => {
  return async ({ githubInstallationId, ref, owner, repo }) => {
    const installation =
      await installationDb.getInstallationByGithubInstallationId(
        githubInstallationId
      )

    const latestStatus = await mergeFreezeStatusDb.getLatestStatus(owner, repo)

    if (!installation || !installation.githubInstallationId)
      throw new Error('Installation not found')

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
