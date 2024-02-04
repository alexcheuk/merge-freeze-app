import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IRequestUnfreezeSinglePrUseCase } from '../../interfaces/use-cases/IRequestUnfreezeSinglePrUseCase'
import { buildUndreezePRModal } from '../../utils/slack-messages/build-unfreeze-pr-modal'

interface Dependencies {
  installationDb: IInstallationDb
}

export const makeRequestUnfreezeSinglePR = ({
  installationDb,
}: Dependencies): IRequestUnfreezeSinglePrUseCase => {
  return async ({ slackTeamId, triggerId, channelId, prId }) => {
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
