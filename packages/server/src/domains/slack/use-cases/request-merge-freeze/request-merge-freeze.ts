import { buildMergeFreezeModal } from '../../utils/slack-messages'
import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IRequestMergeFreezeUseCase } from '../../interfaces/use-cases/IRequestMergeFreezeUseCase'

interface Dependencies {
  installationDb: IInstallationDb
}

export const makeRequestMergeFreeze = ({
  installationDb,
}: Dependencies): IRequestMergeFreezeUseCase => {
  return async ({ slackTeamId, triggerId, channelId, reason = '' }) => {
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
