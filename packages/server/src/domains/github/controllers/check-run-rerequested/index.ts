import { syncStatusOnCheckRun } from '../../use-cases'
import { makeCheckRunRerequestedController } from './check-run-rerequested.controller'

export const checkRunRerequestedController = makeCheckRunRerequestedController({
  syncStatusOnCheckRun,
})
