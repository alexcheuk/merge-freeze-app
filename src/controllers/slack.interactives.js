import mongoose from 'mongoose'
import { createEventAdapter } from '@slack/events-api'
import { createMessageAdapter } from '@slack/interactive-messages'

import { SlackAPI, getBotInfo } from '../services/slack'
import { mergeFreeze } from '../services/github'

import { generateMergeFreezeReply } from '../helpers/slack.messages'

import { getGithubRepo } from '../db'

/**
 * Slack Interactive Events
 */

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)

slackEvents.on('member_joined_channel', async (event) => {
  const userInfo = await getBotInfo(event.user)

  // Check if member that join is our Bot
  // If it is, that means it has been invited to a channel
  if (userInfo.user.name === 'merge_freeze' && userInfo.user.is_bot) {
    SlackAPI.chat.postMessage({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
`
Hey there 👋.
There are 3 commands available to this channel:
`
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
`
*\`/mf reason?\`* - Merge freezes all opened Pull Requests going into the base branch

*\`/!mf\`* - Unfreeze all opened Pull Requests going into the base branch

*\`/!mfpr pr_number\`* - Unfreeze one Pull Request by PR Number
`
          }
        }
      ],
      channel: event.channel
    }).then(res => console.log(res))
  }
})

export const onEvents = slackEvents.requestListener()

/**
 * Slack Interactive Actions
 */

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)

slackInteractions.action({ type: 'dialog_submission' }, async (payload, respond) => {
  const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')

  console.log('Dialog Submission:', payload)

  try {
    const { owner, repo } = await getGithubRepo()

    const { numPRs } = await mergeFreeze(owner, repo, payload.user.name, payload.submission.reason)

    await MergeFreezeStatus.setFrozen(
      {
        owner,
        repo,
        source: 'slack',
        id: payload.user.id,
        name: payload.user.name,
        reason: payload.submission.reason
      }
    )

    // Send an additional message to the whole channel
    await respond({
      replace_original: true,
      ...generateMergeFreezeReply({
        user_id: payload.user.id,
        user_name: payload.user.name,
        text: payload.submission.reason
      }, numPRs)
    })
  } catch (e) {
    console.log('Merge Freeze Failed')
    console.log(e)
  }
})

export const onActions = slackInteractions.requestListener()
