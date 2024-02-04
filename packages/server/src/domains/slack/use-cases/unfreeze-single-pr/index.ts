import { makeGithubApi } from '../../../github/data-access/github.api'
import { installationDb } from '../../../installation/data'
import { mergeFreezeStatusDb } from '../../../merge-freeze-status/data'
import { makeUnfreezeSinglePR } from './unfreeze-single-pr'

export const unfreezeSinglePR = makeUnfreezeSinglePR({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})
