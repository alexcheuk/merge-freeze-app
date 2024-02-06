import { syncStatusOnCheckRun } from '../../use-cases'
import { makePullRequestSyncController } from './pull-request-sync.controller'

export const pullRequestSyncController = makePullRequestSyncController({
  syncStatusOnCheckRun,
})
