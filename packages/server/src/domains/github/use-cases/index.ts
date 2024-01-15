import { installationDb } from '../../installation/data'
import { mergeFreezeStatusDb } from '../../merge-freeze-status/data'
import { makeGithubApi } from '../data-access/github.api'
import { makeSaveInstallationFromGithub } from './save-installation-from-github'
import { makeSyncStatusOnCheckRun } from './sync-status-on-check-run'
import { makeUnfreezeSinglePR } from './unfreeze-single-pr'

const saveInstallationFromGithub = makeSaveInstallationFromGithub({
  installationDb,
})

const syncStatusOnCheckRun = makeSyncStatusOnCheckRun({
  installationDb,
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
})

const unfreezeSinglePR = makeUnfreezeSinglePR({
  installationDb,
  makeGithubDb: makeGithubApi,
  mergeFreezeStatusDb,
})

export { saveInstallationFromGithub, syncStatusOnCheckRun, unfreezeSinglePR }
