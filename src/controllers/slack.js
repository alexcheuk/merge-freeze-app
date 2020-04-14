import moment from 'moment'

import mongoose from 'mongoose'

import { getInstallationBySlackTeamId } from '../db'
import { openConfirmationDialog, openUnfreezePRConfirmationDialog } from '../services/slack'
import { mergeUnfreeze, mergeUnfreezePR } from '../services/github'

import { generateMergeUnfreezeReply, generateMergeUnfreezePRReply, generateStatsMessage } from '../helpers/slack.messages'
import { getInstallationClientByInstallationId } from '../services/github.auth'
import { splitRepositoryPath } from '../helpers/github.checks'
import { getMergeFreezeStats } from '../helpers/stats'

export const postMergeFreeze = async (req, res) => {
  try {
    const installation = await getInstallationBySlackTeamId(req.body.team_id)

    await openConfirmationDialog(installation.slackBotToken, req.body.trigger_id, req.body.text)

    res.json()
  } catch (e) {
    res.send('Failed to merge freeze')
  }
}

export const postMergeUnfreeze = async (req, res) => {
  const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')
  try {
    const installation = await getInstallationBySlackTeamId(req.body.team_id)
    const client = await getInstallationClientByInstallationId(installation.installationId)

    const installedRepos = await (await client.apps.listRepos()).data.repositories

    installedRepos.forEach(async (installedRepo) => {
      const { owner, repo } = splitRepositoryPath(installedRepo.full_name)

      await mergeUnfreeze(owner, repo, req.body.user_name, installedRepo.default_branch)

      await MergeFreezeStatus.setUnfrozen({
        owner,
        repo,
        source: 'slack',
        id: req.body.user_id,
        name: req.body.user_name
      })
    })

    res.json(generateMergeUnfreezeReply({
      ...req.body,
      repos: installedRepos.map(repo => `\`${repo.full_name}\``).join(', ')
    }))
  } catch (e) {
    console.log(e)
    res.send('Failed to unfreeze')
  }
}

export const postMergeUnfreezePR = async (req, res) => {
  try {
    const installation = await getInstallationBySlackTeamId(req.body.team_id)
    const client = await getInstallationClientByInstallationId(installation.installationId)

    const installedRepos = await (await client.apps.listRepos()).data.repositories

    const prID = parseFloat(req.body.text)

    if (installedRepos.length === 1) {
      const { owner, repo } = splitRepositoryPath(installedRepos[0].full_name)

      if (!prID) {
        return res.send(
          'Pull Request number is *required*.\n> Example: `/!mfpr 201`'
        )
      }

      await mergeUnfreezePR(owner, repo, prID, req.body.user_name)

      return res.json(generateMergeUnfreezePRReply({
        ...req.body,
        prId: prID
      }))
    } else if (installedRepos.length > 1) {
      await openUnfreezePRConfirmationDialog(installation.slackBotToken, req.body.trigger_id, prID, installedRepos)

      return res.send()
    }

    res.send('No repository setup')
  } catch (e) {
    res.send('Pull Request does not exist.')
  }
}

export const postMergeFreezeStats = async (req, res) => {
  const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')

  try {
    const installation = await getInstallationBySlackTeamId(req.body.team_id)
    const client = await getInstallationClientByInstallationId(installation.installationId)

    const installedRepos = await (await client.apps.listRepos()).data.repositories

    const { owner, repo } = splitRepositoryPath(installedRepos[0].full_name)

    const allTimeStatus = await MergeFreezeStatus.getStatusListByRepo(owner, repo)
    // Not optimized, regrabbing subsets from data.
    const thisMonthStatus = await MergeFreezeStatus.getStatusListByRepo(owner, repo, {
      datetime: {
        $gte: moment().startOf('month').toDate()
      }
    })
    const lastMonthTimeStatus = await MergeFreezeStatus.getStatusListByRepo(owner, repo, {
      datetime: {
        $gte: moment().subtract(1, 'months').startOf('month').toDate(),
        $lt: moment().subtract(1, 'months').endOf('month').toDate()
      }
    })

    const allTimeStats = getMergeFreezeStats(allTimeStatus)
    const thisMonthStats = getMergeFreezeStats(thisMonthStatus)
    const lastMonthStatus = getMergeFreezeStats(lastMonthTimeStatus)

    return res.json(generateStatsMessage(allTimeStats, thisMonthStats, lastMonthStatus))
  } catch (e) {
    console.log(e)
    res.send('Pull Request does not exist.')
  }
}
