import Controller from './controllers/slack.controller'

import {
  MERGE_FREEZE_MODAL_CALLBACK_ID,
  UNFREEZE_PR_MODAL_CALLBACK_ID,
} from './utils/slack-messages/constants'
import { Router } from 'express'
import { app, receiver } from './configs/slack-bolt.app'
import { isAllowedChannel } from './middlewares/is-allowed-channel.middleware'
import { getInstallation } from './middlewares/get-installation.middleware'

const router = Router()

// Handle interactive slack commands
app.command('/mf', getInstallation, isAllowedChannel, Controller.mergeFreeze)
app.command('/!mf', getInstallation, isAllowedChannel, Controller.mergeUnfreeze)
app.command(
  '/!mfpr',
  getInstallation,
  isAllowedChannel,
  Controller.mergeUnfreezeSinglePR
)

// Handle interactive slack view events
app.view(
  { type: 'view_submission', callback_id: MERGE_FREEZE_MODAL_CALLBACK_ID },
  Controller.mergeFreezeModalSubmission
)
app.view(
  { type: 'view_submission', callback_id: UNFREEZE_PR_MODAL_CALLBACK_ID },
  Controller.unfreezeSinglePRModalSubmission
)

app.event('*', async ({ event }) => {
  console.log(event.type || '')
})

router.get('/auth/slack/install', Controller.installSlack)
router.use('/', receiver.app)

export default router
