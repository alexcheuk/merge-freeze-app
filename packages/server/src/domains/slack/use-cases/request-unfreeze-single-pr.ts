import { IInstallationDb } from '../../installation/interfaces/data/IInstallationDb'
import { RequestUnfreezeSinglePRDTO } from './dtos/request-unfreeze-single-pr.dto'
import { buildUndreezePRModal } from '../utils/slack-messages/build-unfreeze-pr-modal'

interface Dependencies {
  installationDb: IInstallationDb
}

export const makeRequestUnfreezeSinglePR = ({
  installationDb,
}: Dependencies) => {
  return async ({
    slackTeamId,
    triggerId,
    channelId,
    prId,
  }: RequestUnfreezeSinglePRDTO) => {
    const installation = await installationDb.getInstallationBySlackTeamId(
      slackTeamId
    )

    if (!installation?.installedRepos?.length) {
      throw new Error('Merge freeze not installed on any repositories')
    }

    return buildUndreezePRModal({
      triggerId,
      channelId,
      repos: installation?.installedRepos.map((repo) => ({
        text: {
          text: `${repo.owner}/${repo.repo}`,
          type: 'plain_text',
        },
        value: `${repo.owner}/${repo.repo}`,
      })),
      prId,
    })
  }
}
