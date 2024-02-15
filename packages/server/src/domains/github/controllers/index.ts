import { checkRunRerequestedController } from './check-run-rerequested'
import { checkSuiteRequestedController } from './check-suite-requested'
import { checkSuiteRerequestedController } from './check-suite-rerequested'
import { makeEventsController } from './events.controller'
import { installApp } from './install-app.controller'
import { installationAddedController } from './installation-added'
import { installationCreatedController } from './installation-created'
import { installationDeletedController } from './installation-deleted'
import { installationRemovedController } from './installation-removed'
import { pullRequestSyncController } from './pull-request-sync'
import { unfreezeSinglePRActionController } from './unfreeze-single-pr-action'

export const eventsController = makeEventsController({
  installationCreatedController,
  checkRunRerequestedController,
  checkSuiteRequestedController,
  checkSuiteRerequestedController,
  installationDeletedController,
  pullRequestSyncController,
  unfreezeSinglePRActionController,
  installationAddedController,
  installationRemovedController,
})

export const installAppController = installApp
