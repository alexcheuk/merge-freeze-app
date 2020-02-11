import mongoose from 'mongoose'

import { getGithubRepo } from '../db'
import { openConfirmationDialog } from '../services/slack'
import { mergeUnfreeze, mergeUnfreezePR } from '../services/github'

import { generateMergeUnfreezeReply, generateMergeUnfreezePRReply } from '../helpers/slack.messages'

export const postMergeFreeze = async (req, res) => {
  try {
    await openConfirmationDialog(req.body.trigger_id, req.body.text)

    res.send()
  } catch (e) {
    res.send('Failed to merge freeze')
  }
}

export const postMergeUnfreeze = async (req, res) => {
  const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')
  try {
    const { owner, repo } = await getGithubRepo()

    await mergeUnfreeze(owner, repo, req.body.user_name)

    await MergeFreezeStatus.setUnfrozen({
      owner,
      repo,
      source: 'slack',
      id: req.body.user_id,
      name: req.body.user_name
    })

    res.json(generateMergeUnfreezeReply(req.body))
  } catch (e) {
    console.log(e)
    res.send('Failed to unfreeze')
  }
}

export const postMergeUnfreezePR = async (req, res) => {
  try {
    const { owner, repo } = await getGithubRepo()

    const prID = parseFloat(req.body.text)

    if (!prID) {
      return res.send(
        'Pull Request number is *required*.\n> Example: `/!mfpr 201`'
      )
    }

    await mergeUnfreezePR(owner, repo, prID, req.body.user_name)

    res.json(generateMergeUnfreezePRReply(req.body))
  } catch (e) {
    res.send('Pull Request does not exist.')
  }
}
