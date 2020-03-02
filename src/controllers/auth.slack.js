import { saveSlackIntegration, getInstallationByGithubUserId } from '../db'
import { sendWelcomeMessage } from '../helpers/slack.messages'
import { WebClient } from '@slack/web-api'
import { getInstallationClientByInstallationId } from '../services/github.auth'

const SlackAPI = new WebClient()

export const getAuthSlackCallback = async (req, res) => {
  if (!req.query.code) return res.send(401)

  try {
    const installation = await getInstallationByGithubUserId(req.user.id)

    const client = await getInstallationClientByInstallationId(installation.installationId)

    const installedRepos = await (await client.apps.listRepos()).data.repositories

    const resp = await SlackAPI.oauth.v2.access({
      code: req.query.code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET
    })

    await saveSlackIntegration(req.user.id, resp.team.id, resp.access_token)

    await SlackAPI.conversations.join({
      token: resp.access_token,
      channel: resp.incoming_webhook.channel_id
    })

    sendWelcomeMessage({
      token: resp.access_token,
      channelId: resp.incoming_webhook.channel_id,
      repos: installedRepos.map(repo => repo.full_name),
      installUserId: resp.authed_user.id
    })

    console.log(resp)
  } catch (e) {
    console.log('Slack Error', e)
    return res.redirect('/manage?slack-error')
  }

  res.redirect('/manage')
}
