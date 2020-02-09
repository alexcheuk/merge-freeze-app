import { createMessageAdapter } from '@slack/interactive-messages'
import { getGithubRepo, setFrozen } from '../db'
import { mergeFreeze } from '../github/functions'
import { generateMergeFreezeReply } from './utils'

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)

module.exports = app => {
  app.use('/slack/actions', slackInteractions.requestListener())

  slackInteractions.action({ type: 'dialog_submission' }, async (payload, respond) => {
    const { owner, repo } = await getGithubRepo()

    // Logs the contents of the action to the console
    console.log('payload', payload)

    const { numPRs } = await mergeFreeze(owner, repo, payload.user.name, payload.submission.reason)

    await setFrozen(
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
    respond({
      replace_original: true,
      ...generateMergeFreezeReply({
        user_id: payload.user.id,
        user_name: payload.user.name,
        text: payload.submission.reason
      }, numPRs)
    })
  })
}
