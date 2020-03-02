import { getInstallationByGithubUserId } from '../db'
import { getInstallationClientByInstallationId } from '../services/github.auth'
import { testConnection } from '../helpers/slack.messages'

export const getAppManage = async (req, res) => {
  console.log('Manage: ', req.user)
  try {
    const installation = await getInstallationByGithubUserId(req.user.id)

    const client = await getInstallationClientByInstallationId(installation.installationId)

    const installedRepos = await (await client.apps.listRepos()).data.repositories || []

    const slackIntegrated = await testConnection(installation.slackBotToken)
    // console.log(installedRepos)

    res.render('index.html', {
      installation,
      user: req.user,
      installedRepos,
      slackIntegrated,
      slackClientId: process.env.SLACK_CLIENT_ID,
      githubAppName: process.env.GITHUB_APP_NAME
    })
  } catch (e) {
    console.log(e)
    return res.render('index.html', {
      installation: null,
      user: req.user,
      installedRepos: [],
      slackIntegrated: false,
      slackClientId: process.env.SLACK_CLIENT_ID,
      githubAppName: process.env.GITHUB_APP_NAME
    })
  }
}
