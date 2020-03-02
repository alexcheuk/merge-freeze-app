import mongoose from 'mongoose'
import { createMessageAdapter } from '@slack/interactive-messages'

import { mergeFreeze, mergeUnfreezePR } from '../services/github'

import { generateMergeFreezeReply, generateMergeUnfreezePRReply } from '../helpers/slack.messages'

import { getInstallationBySlackTeamId } from '../db'
import { getInstallationClientByInstallationId } from '../services/github.auth'
import { splitRepositoryPath } from '../helpers/github.checks'

/**
 * Slack Interactive Actions
 */

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)

slackInteractions.action({ type: 'dialog_submission' }, async (payload, respond) => {
  const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')

  console.log('Dialog Submission:', payload)

  try {
    // Logs the contents of the action to the console
    console.log('payload', payload)

    const installation = await getInstallationBySlackTeamId(payload.team.id)
    const client = await getInstallationClientByInstallationId(installation.installationId)

    if (payload.callback_id === 'confirm_unfreeze_pr_id') {
      const prID = parseFloat(payload.submission.prId)

      const { owner, repo } = splitRepositoryPath(payload.submission.repo)

      await mergeUnfreezePR(owner, repo, prID, payload.user.name)

      await respond({
        replace_original: true,
        ...generateMergeUnfreezePRReply({
          user_id: payload.user.id,
          user_name: payload.user.name,
          owner,
          repo,
          prId: prID
        })
      })
    } else {
      const installedRepos = await (await client.apps.listRepos()).data.repositories

      installedRepos.forEach(async (installedRepo) => {
        const { owner, repo } = splitRepositoryPath(installedRepo.full_name)

        await mergeFreeze(owner, repo, payload.user.name, installedRepo.default_branch, payload.submission.reason)

        await MergeFreezeStatus.setFrozen(
          {
            owner,
            repo,
            source: 'slack',
            id: payload.user.id,
            name: payload.user.name,
            reason: payload.submission.reason
          }
        )
      })

      // Send an additional message to the whole channel
      await respond({
        replace_original: true,
        ...generateMergeFreezeReply({
          user_id: payload.user.id,
          user_name: payload.user.name,
          text: payload.submission.reason,
          repos: installedRepos.map(repo => `\`${repo.full_name}\``).join(', ')
        })
      })
    }
  } catch (e) {
    console.log('Merge Freeze Failed')
    console.log(e)

    await respond({
      replace_original: true,
      text: 'Merge Freeze Failed. Pull Request does not exist.'
    })
  }
})

export const onActions = slackInteractions.requestListener()
