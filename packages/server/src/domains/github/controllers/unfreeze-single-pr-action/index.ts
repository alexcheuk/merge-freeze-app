import { unfreezeSinglePR } from '../../use-cases'
import { makeUnfreezeSinglePrActionController } from './unfreeze-single-pr-action.controller'

export const unfreezeSinglePRActionController =
  makeUnfreezeSinglePrActionController({
    unfreezeSinglePR,
  })
