import { syncStatusOnCheckRun } from '../../use-cases'
import { makeCheckSuiteRerequestedController } from './check-suite-rerequested.controller'

export const checkSuiteRerequestedController =
  makeCheckSuiteRerequestedController({
    syncStatusOnCheckRun,
  })
