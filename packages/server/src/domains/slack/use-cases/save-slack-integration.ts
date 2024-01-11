import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { SlackAPI } from '../interfaces/data-access/slack.api'
import { SaveSlackIntegrationDTO } from '../interfaces/dtos/save-slack-integration.dto'

interface Dependency {
  installationDb: InstallationDb
  slackAPI: SlackAPI
}

const buildBotWelcomeMessage = ({
  channelId,
  installUserId,
  repos,
}: {
  channelId: string
  installUserId: string
  repos: string[]
}) => {
  return {
    channel: channelId,
    text: 'Merge Freeze App integrated',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
Hey there 👋.
*Merge Freeze* has been added by <@${installUserId}> for ${repos
            .map((repo) => `\`${repo}\``)
            .join(', ')}
`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
There are 3 commands available to this channel:

*\`/mf reason?\`* - Merge freezes all opened Pull Requests going into the base branch

*\`/!mf\`* - Unfreeze all opened Pull Requests going into the base branch

*\`/!mfpr pr_number\`* - Unfreeze one Pull Request by PR Number
`,
        },
      },
    ],
  }
}

export const makeSaveSlackIntegration = ({
  installationDb,
  slackAPI,
}: Dependency) => {
  return async ({
    githubUserId,
    slackInstallation,
  }: SaveSlackIntegrationDTO) => {
    try {
      await installationDb.upsertSlackIntegration(Number(githubUserId), {
        slackTeamId: slackInstallation.team?.id || '',
        slackInstallation: slackInstallation,
      })

      await slackAPI.joinChannel({
        token: slackInstallation.bot?.token,
        channel: slackInstallation.incomingWebhook?.channelId || '',
      })

      await slackAPI.postMessage({
        token: slackInstallation.bot?.token,
        message: buildBotWelcomeMessage({
          channelId: slackInstallation.incomingWebhook?.channelId || '',
          installUserId: slackInstallation.user.id,
          repos: [],
        }),
      })
    } catch (e) {
      throw e
    }
  }
}
