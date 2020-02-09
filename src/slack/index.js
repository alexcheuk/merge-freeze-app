import {
  mergeFreeze,
  mergeUnfreeze,
  mergeUnfreezePR
} from '../github/functions'
import { setUnfrozen, getGithubRepo } from '../db'
import {
  generateMergeUnfreezeReply,
  generateMergeUnfreezePRReply,
  openConfirmationDialog
} from './utils'
import { verifySignature, isAllowedChannel } from './middleware'
import bodyParser from 'body-parser'

const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

module.exports = (app) => {
  app.post('/slack/merge-freeze', urlencodedParser, verifySignature, isAllowedChannel, async (req, res) => {
    try {
      await openConfirmationDialog(req.body.trigger_id, req.body.text)

      res.send()
    } catch (e) {
      res.send('Failed to merge freeze')
    }
  })

  app.post('/slack/merge-unfreeze', urlencodedParser, verifySignature, isAllowedChannel, async (req, res) => {
    try {
      const { owner, repo } = await getGithubRepo()

      const { numPRs } = await mergeUnfreeze(owner, repo, req.body.user_name)
      await setUnfrozen({
        owner,
        repo,
        source: 'slack',
        id: req.body.user_id,
        name: req.body.user_name
      })

      res.json(generateMergeUnfreezeReply(req.body, numPRs))
    } catch (e) {
      res.send('Failed to unfreeze')
    }
  })

  app.post('/slack/merge-unfreeze-pr', urlencodedParser, verifySignature, isAllowedChannel, async (req, res) => {
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
  })
}
