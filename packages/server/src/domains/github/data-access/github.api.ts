import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/rest'

const CHECK_NAME = 'Merge Freeze'

export type GithubAPI = typeof makeGithubApi

export const makeGithubApi = ({
  installationId,
  owner,
  repo,
}: {
  installationId: number
  owner: string
  repo: string
}) => {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_IDENTIFIER || '',
      privateKey: process.env.GITHUB_PRIVATE_KEY || '',
      installationId: installationId,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  })

  return {
    getOpenPrs: () => {
      return octokit.pulls.list({
        owner,
        repo,
        state: 'open',
      })
    },
    getPr: (prId: number) => {
      return octokit.pulls.get({
        owner,
        repo,
        pull_number: prId,
      })
    },
    getChecksByRef: (ref: string) => {
      return octokit.checks.listForRef({
        owner,
        repo,
        ref,
        check_name: CHECK_NAME,
      })
    },
    createCheck: (
      ref: string,
      {
        title,
        conclusion,
        summary = '',
        details = '',
        actions,
      }: {
        conclusion: 'failure' | 'success'
        title: string
        summary?: string
        details?: string
        actions?: {
          label: string
          description: string
          identifier: string
        }[]
      }
    ) => {
      return octokit.checks.create({
        owner,
        repo,
        name: CHECK_NAME,
        check_name: CHECK_NAME,
        head_sha: ref,
        status: 'completed',
        conclusion,
        title,
        output: {
          title,
          summary,
          text: details,
        },
        actions,
      })
    },
    updateCheck: (
      checkId: number,
      {
        title,
        conclusion,
        summary = '',
        details = '',
        actions,
      }: {
        conclusion: 'failure' | 'success'
        title: string
        summary?: string
        details?: string
        actions?: {
          label: string
          description: string
          identifier: string
        }[]
      }
    ) => {
      return octokit.checks.update({
        check_run_id: checkId,
        owner,
        repo,
        name: CHECK_NAME,
        check_name: CHECK_NAME,
        status: 'completed',
        conclusion,
        title,
        output: {
          title,
          summary,
          text: details,
        },
        actions,
      })
    },
    uninstall: () => {
      return octokit.apps.deleteInstallation({
        installation_id: installationId,
      })
    },
  }
}
