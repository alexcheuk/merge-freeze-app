import { installationDb } from '../../../installation/data'
import { makeUnfreezeRepos } from './unfreeze-repos'

export const unfreezeRepos = makeUnfreezeRepos({
  installationDb,
})
