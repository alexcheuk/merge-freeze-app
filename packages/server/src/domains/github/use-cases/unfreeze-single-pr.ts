import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { GithubAPI } from '../data-access/github.api'
import { buildUnfrozenGithubCheck } from '../utils/build-unfrozen-github-check'

interface Dependency {
  installationDb: InstallationDb
  mergeFreezeStatusDb: MergeFreezeStatusDb
  makeGithubDb: GithubAPI
}

export const makeUnfreezeSinglePR = ({
  installationDb,
  mergeFreezeStatusDb,
  makeGithubDb,
}: Dependency) => {
  return async ({
    githubInstallationId,
    ref,
    owner,
    repo,
    requester,
    requesterId,
  }: {
    githubInstallationId: number
    ref: string
    owner: string
    repo: string
    requester: string
    requesterId: string
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
