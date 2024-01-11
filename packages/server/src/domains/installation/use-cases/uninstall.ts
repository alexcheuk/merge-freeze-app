import { makeGithubApi } from '../../github/data-access/github.api'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { slackApi } from '../../slack/data-access'
import { SlackAPI } from '../../slack/interfaces/data-access/slack.api'

interface Dependency {
  slackApi: SlackAPI
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeUninstall = ({ installationDb }: Dependency) => {
  return async (githubUserId: number) => {
    try {
      const installation = await installationDb.getInstallationByGithubUserId(
        githubUserId
      )

      if (!installation) throw new Error('Unable to find installation')

      if (installation.slackInstallation?.bot?.token)
        await slackApi.uninstall({
          token: installation.slackInstallation.bot.token,
        })

      for (let i = 0; i < installation.installedRepos.length; i++) {
        const gh = await makeGithubApi({
          installationId: installation.githubInstallationId,
          owner: '',
          repo: '',
        })

        try {
          await gh.uninstall()
        } catch {}
      }

      await installationDb.deleteAllInstallationByGithubUserId(githubUserId)
    } catch (e) {
      console.log('ERROR', e)
      throw e
    }
  }
}
