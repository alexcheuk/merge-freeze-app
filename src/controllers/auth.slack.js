import { saveSlackIntegration } from '../db'
import { sendWelcomeMessage } from '../helpers/slack.messages'
import { WebClient } from '@slack/web-api'

const SlackAPI = new WebClient()

export const getAuthSlackCallback = async (req, res) => {
  if (!req.query.code) return res.send(401)

  try {
    const resp = await SlackAPI.oauth.v2.access({
      code: req.query.code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET
    })

    await saveSlackIntegration(req.user.id, resp.team.id, resp.access_token)

    sendWelcomeMessage(resp.access_token, resp.incoming_webhook.channel_id)

    console.log(resp)
  } catch (e) {
    console.log('Slack Error', e)
    return res.redirect('/manage?slack-error')
  }

  res.redirect('/manage')
}
