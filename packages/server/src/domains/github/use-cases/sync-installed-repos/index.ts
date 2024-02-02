import { installationDb } from '../../../installation/data'
import { makeGithubApi } from '../../data-access/github.api'
import { makeSyncInstalledRepos } from './sync-installed-repos'

export const syncInstalledRepos = makeSyncInstalledRepos({
  installationDb,
  makeGithubApi,
})
