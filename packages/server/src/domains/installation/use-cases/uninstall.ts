import { makeGithubApi } from '../../github/data-access/github.api'
import { slackApi } from '../../slack/data'
import { SlackDb } from '../../slack/data/slack.db.interface'
import { InstallationDb } from '../data/installation.db.interface'
import { IUninstallUseCase } from '../interfaces/use-cases/IUninstallUseCase'

interface Dependency {
  slackApi: SlackDb
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeUninstall = ({
  installationDb,
}: Dependency): IUninstallUseCase => {
  return async ({ githubUserId }) => {
    try {
      const installation = await installationDb.getInstallationByGithubUserId(
        githubUserId
      )

      if (!installation) throw new Error('Unable to find installation')

      /**
       * Uninstall Slack app integration
       */
      if (installation.canUninstallFromSlack)
        await slackApi.uninstall({
          token: installation?.slackInstallation?.bot?.token,
        })

      /**
       * Uninstall Github app integrations on all installed repos
       */
      if (installation.canUninstallFromGithub) {
        for (let i = 0; i < installation!.installedRepos!.length; i++) {
          const gh = await makeGithubApi({
            installationId: installation.githubInstallationId as number,
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
