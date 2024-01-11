import { NextFunction, Request, Response } from 'express'
import { WebhookEventName, InstallationEvent } from '@octokit/webhooks-types'
import { uninstall } from '../../installation'
import { saveInstallationFromGithub } from '../use-cases'

const eventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event = req.headers['x-github-event'] as WebhookEventName

  console.log(`Received Github Event: ${event}`)
  console.log(`Received Github Payload:`, req.body)
  try {
    switch (event) {
      case 'installation':
        const installationEvent: InstallationEvent = req.body

        switch (installationEvent.action) {
          case 'created':
            await saveInstallationFromGithub(
              installationEvent.sender.id,
              installationEvent.installation.id,
              installationEvent.repositories?.map((repo) => {
                const [owner, repoName] = repo.full_name.split('/')

                return {
                  owner,
                  repo: repoName,
                }
              }) || []
            )

            return res.status(200).send()
          case 'deleted':
            await uninstall(installationEvent.sender.id)

            return res.status(200).send()
        }

        return res.status(200).send()

      case 'installation_repositories':
        // const repoEvent: InstallationRepositoriesEvent = req.body

        return res.status(200).send()

      default:
        return res.status(200).send()
    }
  } catch (e) {
    next(e)
  }
}

export default { eventsController }
