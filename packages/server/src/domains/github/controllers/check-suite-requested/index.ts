import { syncStatusOnCheckRun } from '../../use-cases'
import { makeCheckSuiteRequestedController } from './check-suite-requested.controller'

export const checkSuiteRequestedController = makeCheckSuiteRequestedController({
  syncStatusOnCheckRun,
})
