import { installationDb } from '../../../installation/data'
import { makeFreezeRepos } from './freeze-repos'

export const freezeRepos = makeFreezeRepos({
  installationDb,
})
