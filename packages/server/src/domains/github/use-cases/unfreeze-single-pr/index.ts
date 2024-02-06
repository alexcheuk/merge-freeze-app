import { installationDb } from '../../../installation/data'
import { mergeFreezeStatusDb } from '../../../merge-freeze-status/data'
import { makeGithubApi } from '../../data-access/github.api'
import { makeUnfreezeSinglePR } from './unfreeze-single-pr'

export const unfreezeSinglePR = makeUnfreezeSinglePR({
  installationDb,
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
})
