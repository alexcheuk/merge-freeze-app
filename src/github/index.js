import {
  checkRun, onPullRequest
} from './functions'

import { verifyGithubPayload } from './middleware'

module.exports = (app) => {
  app.post('/github', verifyGithubPayload, async (req, res) => {
    console.log('Event: ', req.headers['x-github-event'])
    console.log('Action: ', req.body.action)

    switch (req.headers['x-github-event']) {
      case 'check_run':
        checkRun(req.body)
        break

      case 'pull_request':
        onPullRequest(req.body)
        break

      default:
        break
    }

    res.json({
      status: 200
    })
  })
}
