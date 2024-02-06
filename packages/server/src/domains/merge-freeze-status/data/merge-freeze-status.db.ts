import { IInstallationDb } from '../../installation/interfaces/data/IInstallationDb'
import { IMergeFreezeStatusDb } from '../interfaces/data-access/IMergeFreezeStatusDb'
import { IMergeFreezeStatusModel } from '../interfaces/models/IMergeFreezeStatusModel'
import { MergeFreezeStatus } from './entities/merge-freeze-status.entity'

interface Dependencies {
  MergeFreezeStatusModel: IMergeFreezeStatusModel
  InstallationDb: IInstallationDb
}

export const makeMergeFreezeStatusDb = ({
  MergeFreezeStatusModel,
  InstallationDb,
}: Dependencies): IMergeFreezeStatusDb => {
  return {
    freeze: async ({ owner, repo, source, id, name, reason }) => {
      await MergeFreezeStatusModel.create({
        repoOwner: owner,
        repoName: repo,
        source,
        requesterId: id,
        requester: name,
        reason,
        datetime: new Date(),
        isFrozen: true,
      })
    },
    unfreeze: async ({ owner, repo, source, id, name }) => {
      await MergeFreezeStatusModel.create({
        repoOwner: owner,
        repoName: repo,
        source,
        requesterId: id,
        requester: name,
        datetime: new Date(),
        isFrozen: false,
        reason: '',
      })
    },
    getLatestStatus: async (owner, repo) => {
      const doc = await MergeFreezeStatusModel.findOne({
        repoOwner: owner,
        repoName: repo,
      })

      return doc
    },
    getAllRepoStatusesByGithubId: async (githubUserId) => {
      const installation = await InstallationDb.getInstallationByGithubUserId(
        githubUserId
      )

      if (!installation) throw new Error()

      const repos = installation.installedRepos || []

      const statusPromises: Promise<MergeFreezeStatus | null>[] = []
      const repoStatusMap: { [repo: string]: MergeFreezeStatus | null } = {}

      repos.forEach((repo) => {
        statusPromises.push(
          MergeFreezeStatusModel.findOne({
            repoOwner: repo.owner,
            repoName: repo.repo,
          }).then((status) => {
            repoStatusMap[`${repo.owner}/${repo.repo}`] = status

            return status
          })
        )
      })

      await Promise.all(statusPromises)

      return repoStatusMap
    },
  }
}
