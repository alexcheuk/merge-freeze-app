import { installationDb } from '../data-access'
import { makeUninstall } from './uninstall'
import { makeGetInstallationByGithubUserId } from './get-installation'
import { makeGithubApi } from '../../github/data-access/github.api'
import { slackApi } from '../../slack/data-access'

const getInstallationByGithubUserId = makeGetInstallationByGithubUserId({
  installationDb,
})

const uninstall = makeUninstall({
  installationDb,
  makeGithubDb: makeGithubApi,
  slackApi: slackApi,
})

export { getInstallationByGithubUserId, uninstall }
