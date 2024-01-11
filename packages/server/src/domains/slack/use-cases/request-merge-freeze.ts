import { buildMergeFreezeModal } from '../utils/slack-messages'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { RequestMergeFreezeDTO } from '../interfaces/dtos/request-merge-freeze.dto'

interface Dependencies {
  installationDb: InstallationDb
}

export const makeRequestMergeFreeze = ({ installationDb }: Dependencies) => {
  return async ({
    slackTeamId,
    triggerId,
    channelId,
    reason = '',
  }: RequestMergeFreezeDTO) => {
    const installation = await installationDb.getInstallationBySlackTeamId(
      slackTeamId
    )

    if (!installation?.installedRepos?.length) {
      throw new Error('Merge freeze not installed on any repositories')
    }

    return buildMergeFreezeModal({
      triggerId,
      channelId,
      repos: installation?.installedRepos.map((repo) => ({
        text: {
          text: `${repo.owner}/${repo.repo}`,
          type: 'plain_text',
        },
        value: `${repo.owner}/${repo.repo}`,
      })),
      reason,
    })
  }
}
