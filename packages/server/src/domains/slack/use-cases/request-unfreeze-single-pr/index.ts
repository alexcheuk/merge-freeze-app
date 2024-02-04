import { installationDb } from '../../../installation/data'
import { makeRequestUnfreezeSinglePR } from './request-unfreeze-single-pr'

export const requestUnfreezeSinglePR = makeRequestUnfreezeSinglePR({
  installationDb,
})
