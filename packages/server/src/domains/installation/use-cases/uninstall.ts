import { UseCase } from '../../../shared/interfaces/use-case'
import { makeGithubApi } from '../../github/data-access/github.api'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { slackApi } from '../../slack/data'
import { SlackDb } from '../../slack/data/slack.db.interface'

interface Dependency {
  slackApi: SlackDb
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubApi
}

export interface UninstallInput {
  githubUserId: number
}

export type UninstallOutput = void

export const makeUninstall = ({
  installationDb,
}: Dependency): UseCase<UninstallInput, UninstallOutput> => {
  return async ({ githubUserId }) => {
    try {
      const installation = await installationDb.getInstallationByGithubUserId(
        githubUserId
      )

      if (!installation) throw new Error('Unable to find installation')

      /**
       * Uninstall Slack app integration
       */
      if (installation.slackInstallation?.bot?.token)
        await slackApi.uninstall({
          token: installation.slackInstallation.bot.token,
        })

      /**
       * Uninstall Github app integrations on all installed repos
       */
      if (
        installation.githubInstallationId &&
        installation?.installedRepos?.length
      ) {
        for (let i = 0; i < installation?.installedRepos?.length; i++) {
          const gh = await makeGithubApi({
            installationId: installation.githubInstallationId,
            owner: '',
            repo: '',
          })

          try {
            await gh.uninstall()
          } catch {}
        }
      }

      /**
       * Delete installation from DB
       */
      await installationDb.deleteAllInstallationByGithubUserId(githubUserId)
    } catch (e) {
      console.log('ERROR', e)
      throw e
    }
  }
}
