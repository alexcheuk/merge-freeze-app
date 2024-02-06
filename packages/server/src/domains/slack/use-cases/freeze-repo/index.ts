import { makeGithubApi } from '../../../github/data-access/github.api'
import { installationDb } from '../../../installation/data'
import { mergeFreezeStatusDb } from '../../../merge-freeze-status/data'
import { makeFreezeRepo } from './freeze-repo'

export const freezeRepo = makeFreezeRepo({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})
