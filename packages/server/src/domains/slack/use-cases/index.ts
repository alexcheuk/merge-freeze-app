import { makeGithubApi } from '../../github/data-access/github.api'
import { makeFreezeRepos } from './freeze-repos'
import { makeUnfreezeRepos } from './unfreeze-repos'
import { makeRequestMergeFreeze } from './request-merge-freeze'
import { mergeFreezeStatusDb } from '../../merge-freeze-status/data'
import { makeFreezeRepo } from './freeze-repo'
import { makeUnfreezeRepo } from './unfreeze-repo'
import { makeUnfreezeSinglePR } from './unfreeze-single-pr'
import { makeRequestUnfreezeSinglePR } from './request-unfreeze-single-pr'
import { makeSaveSlackIntegration } from './save-slack-integration'
import { slackApi } from '../data'
import { installationDb } from '../../installation/data'

export const freezeRepos = makeFreezeRepos({
  installationDb,
})

export const freezeRepo = makeFreezeRepo({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})

export const unfreezeRepos = makeUnfreezeRepos({
  installationDb,
})

export const unfreezeRepo = makeUnfreezeRepo({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})

export const unfreezeSinglePR = makeUnfreezeSinglePR({
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
  installationDb,
})

export const requestMergeFreeze = makeRequestMergeFreeze({
  installationDb,
})

export const requestUnfreezeSinglePR = makeRequestUnfreezeSinglePR({
  installationDb,
})

export const saveSlackIntegration = makeSaveSlackIntegration({
  installationDb,
  slackAPI: slackApi,
})
