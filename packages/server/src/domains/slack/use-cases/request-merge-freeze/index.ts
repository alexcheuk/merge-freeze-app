import { installationDb } from '../../../installation/data'
import { makeRequestMergeFreeze } from './request-merge-freeze'

export const requestMergeFreeze = makeRequestMergeFreeze({
  installationDb,
})
