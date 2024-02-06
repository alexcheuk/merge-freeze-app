import { Middleware, SlackCommandMiddlewareArgs } from '@slack/bolt'
import { installationDb } from '../../installation/data'

export const getInstallation: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  next,
}) => {
  const installation = await installationDb.getInstallationBySlackTeamId(
    body.team_id
  )

  if (!installation?.isInstallationComplete) {
    return await ack(`Merge freeze is not fully setup`)
  }

  body.installation = installation

  next()
}
