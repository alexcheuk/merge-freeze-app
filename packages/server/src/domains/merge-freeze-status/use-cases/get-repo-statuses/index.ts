import { mergeFreezeStatusDb } from '../../data'
import { makeGetRepoStatuses } from './get-repo-statuses'

export const getRepoStatuses = makeGetRepoStatuses({
  mergeFreezeStatusDb,
})
