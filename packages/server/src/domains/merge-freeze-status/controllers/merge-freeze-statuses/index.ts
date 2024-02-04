import { getRepoStatuses } from '../../use-cases/get-repo-statuses'
import { makeMergeFreezeStatusesController } from './merge-freeze-statuses.controller'

export const mergeFreezeStatusesController = makeMergeFreezeStatusesController({
  getRepoStatuses,
})
