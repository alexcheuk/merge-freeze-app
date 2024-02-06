import { makeGithubApi } from '../../../github/data-access/github.api'
import { installationDb } from '../../../installation/data'
import { mergeFreezeStatusDb } from '../../../merge-freeze-status/data'
import { makeUnfreezeRepo } from './unfreeze-repo'

export const unfreezeRepo = makeUnfreezeRepo({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})
