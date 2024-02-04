import { IMergeFreezeStatusDb } from '../../interfaces/data-access/IMergeFreezeStatusDb'
import { IGetRepoStatusesUseCase } from '../../interfaces/use-cases/IGetRepoStatusesUseCase'

interface Dependencies {
  mergeFreezeStatusDb: IMergeFreezeStatusDb
}

export const makeGetRepoStatuses = ({
  mergeFreezeStatusDb,
}: Dependencies): IGetRepoStatusesUseCase => {
  return async ({ githubUserId }) => {
    return mergeFreezeStatusDb.getAllRepoStatusesByGithubId(githubUserId)
  }
}
