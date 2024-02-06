import { installationDb } from '../../../installation/data'
import { mergeFreezeStatusDb } from '../../../merge-freeze-status/data'
import { makeGithubApi } from '../../data-access/github.api'
import { makeSyncStatusOnCheckRun } from './sync-status-on-check-run'

export const syncStatusOnCheckRun = makeSyncStatusOnCheckRun({
  installationDb,
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
})
