import { InstallationDb } from '../../../installation/data/installation.db.interface'
import { MergeFreezeStatusDb } from '../../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { GithubAPI } from '../../data-access/github.api'
import { IUnfreezeSinglePRUseCase } from '../../interfaces/use-cases/IUnfreezeSinglePRUseCase'
import { buildUnfrozenGithubCheck } from '../../utils/build-unfrozen-github-check'

interface Dependency {
  installationDb: InstallationDb
  mergeFreezeStatusDb: MergeFreezeStatusDb
  makeGithubDb: GithubAPI
}

export const makeUnfreezeSinglePR = ({
  installationDb,
  mergeFreezeStatusDb,
  makeGithubDb,
}: Dependency): IUnfreezeSinglePRUseCase => {
  return async ({
    githubInstallationId,
    ref,
    owner,
    repo,
    requester,
    requesterId,
  }) => {
    const installation =
      await installationDb.getInstallationByGithubInstallationId(
        githubInstallationId
      )

    if (!installation || !installation.githubInstallationId) return

    const gh = makeGithubDb({
      installationId: installation.githubInstallationId,
      owner,
      repo,
    })

    mergeFreezeStatusDb.unfreeze({
      id: requesterId,
      metadata: null,
      name: requester,
      owner,
      repo,
      source: 'github-action',
    })

    gh.createCheck(
      ref,
      buildUnfrozenGithubCheck({
        reason: '',
        requesterName: requester,
      })
    )
  }
}
