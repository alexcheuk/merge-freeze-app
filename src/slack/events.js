import { getBotInfo, slackapi } from '../slack/utils'
import { createEventAdapter } from '@slack/events-api'

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)

module.exports = app => {
  app.use('/slack/events', slackEvents.requestListener())

  slackEvents.on('member_joined_channel', async (event) => {
    const userInfo = await getBotInfo(event.user)
    console.log(userInfo)
    if (userInfo.user.name === 'freeze_merge' && userInfo.user.is_bot) {
      console.log('post welcome message')
      slackapi.chat.postMessage({
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
}
