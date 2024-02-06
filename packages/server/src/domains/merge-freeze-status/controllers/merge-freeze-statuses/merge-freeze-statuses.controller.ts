import { makeController } from '../../../../infrastructure/utils/make-controller'
import { AuthenticatedRequest } from '../../../auth/interfaces/controllers/auth-controller'
import { IMergeFreezeStatusesController } from '../../interfaces/controllers/IMergeFreezeStatusesController'
import { IGetRepoStatusesUseCase } from '../../interfaces/use-cases/IGetRepoStatusesUseCase'

interface Dependencies {
  getRepoStatuses: IGetRepoStatusesUseCase
}

export const makeMergeFreezeStatusesController = ({
  getRepoStatuses,
}: Dependencies): IMergeFreezeStatusesController => {
  return makeController(async (req: AuthenticatedRequest) => {
    const statuses = await getRepoStatuses({
      githubUserId: req.user.githubUserId,
    })

    return statuses
  })
}
