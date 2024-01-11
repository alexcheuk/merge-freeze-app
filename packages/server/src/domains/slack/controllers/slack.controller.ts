import {
  Installation,
  Middleware,
  SlackCommandMiddlewareArgs,
  SlackViewMiddlewareArgs,
} from '@slack/bolt'
import {
  requestMergeFreeze,
  freezeRepos,
  unfreezeRepos,
  unfreezeSinglePR,
  requestUnfreezeSinglePR,
  saveSlackIntegration,
} from '../use-cases'
import { buildMergeFrozenMessage } from '../utils/slack-messages/build-merge-frozen-message'
import { MergeFreezeModalSubmissionValuesDTO } from '../interfaces/dtos/merge-freeze-modal-submission.dto'
import { RequestHandler } from 'express'
import { slackApi } from '../data-access'
import { buildMergeUnfreezeMessage } from '../utils/slack-messages/build-merge-unfrozen-message'
import { UnfreezeSinglePRModalSubmissionDTO } from '../interfaces/dtos/unfreeze-pr-modal-submission.dto'
import { buildUnfreezeSinglePRMessage } from '../utils/slack-messages/build-unfreeze-single-pr.message'
import { IncomingMessage, ServerResponse } from 'http'
import passport from 'passport'
import { UserJWTPayload } from '../../auth/interfaces/dtos/user-jwt-payload'

const mergeFreeze: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  client,
}) => {
  try {
    await ack()

    const modalOptions = await requestMergeFreeze({
      triggerId: body.trigger_id,
      channelId: body.channel_id,
      slackTeamId: body.team_id,
      reason: body.text,
    })

    await client.views.open(modalOptions)
  } catch (e) {
    throw e
  }
}

const mergeFreezeModalSubmission: Middleware<
  SlackViewMiddlewareArgs,
  { text: string }
> = async ({ ack, body, client }) => {
  try {
    await ack()

    const formValues = body.view.state
      .values as MergeFreezeModalSubmissionValuesDTO

    const reason = formValues?.reason_block?.reason_input.value || ''
    const selectedRepos =
      formValues?.repo_block?.repo_input?.selected_options || []

    await freezeRepos({
      slackTeamId: body.team?.id || '',
      reason,
      repos: selectedRepos.map((option) => ({
        owner: option.value.split('/')[0],
        repo: option.value.split('/')[1],
      })),
      requesterId: body.user.id,
      requesterName: body.user.name,
    })

    await client.chat.postMessage(
      buildMergeFrozenMessage({
        channelId: body.view.private_metadata,
        requestedByUserId: body.user.id,
        repos: selectedRepos.map((option) => option.value),
        reason,
      })
    )
  } catch (e) {
    throw e
  }
}

const mergeUnfreeze: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  client,
  respond,
}) => {
  try {
    await ack()

    const unfrozenRepos = await unfreezeRepos({
      slackTeamId: body.team_id || '',
      reason: '',
      requesterId: body.user_id,
      requesterName: body.user_name,
    })

    await client.chat.postMessage(
      buildMergeUnfreezeMessage({
        channelId: body.channel_id,
        requestedByUserId: body.user_id,
        repos: unfrozenRepos.map((repo) => `${repo.owner}/${repo.repo}`),
      })
    )
  } catch (e) {
    respond({
      text: '/!mf failed. Please try again later.',
      response_type: 'ephemeral',
    })
  }
}

const mergeUnfreezeSinglePR: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  client,
  respond,
}) => {
  try {
    await ack()

    const modalOptions = await requestUnfreezeSinglePR({
      slackTeamId: body.team_id,
      prId: Number(body.text),
      triggerId: body.trigger_id,
      channelId: body.channel_id,
    })

    await client.views.open(modalOptions)
  } catch (e) {
    respond({
      text: `/!mfpr${
        body.text ? ` ${Number(body.text)}` : ''
      } failed. Please try again later.`,
      response_type: 'ephemeral',
    })
  }
}

const unfreezeSinglePRModalSubmission: Middleware<
  SlackViewMiddlewareArgs,
  { text: string }
> = async ({ ack, body, client }) => {
  try {
    await ack()

    const formValues = body.view.state
      .values as UnfreezeSinglePRModalSubmissionDTO

    const prId = formValues.prid_block?.prid_input.value
    const repo = formValues.repo_block?.repo_input.selected_option.value

    if (!prId || !repo) {
      throw new Error('Pull request ID or Repository is missing.')
    }

    await unfreezeSinglePR({
      slackTeamId: body.team?.id || '',
      prId: Number(prId),
      reason: '',
      repo: {
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
      },
      requesterId: body.user.id,
      requesterName: body.user.name,
    })

    await client.chat.postMessage(
      buildUnfreezeSinglePRMessage({
        channelId: body.view.private_metadata,
        requestedByUserId: body.user.id,
        repo: {
          owner: repo.split('/')[0],
          repo: repo.split('/')[1],
        },
        prId,
      })
    )
  } catch (e) {
    throw e
  }
}

const slackInstallationCallback = (
  installation: Installation<'v2'>,
  opts: any,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  return new Promise<boolean>((resolve) => {
    /**
     * We are authenticating the incoming callback to /auth/slack/callback
     * to retrieve the user's installation
     */
    passport.authenticate(
      'jwt',
      {},
      async (_: any, userJwt: UserJWTPayload) => {
        await saveSlackIntegration({
          githubUserId: Number(userJwt.githubUserId),
          slackInstallation: installation,
        })

        resolve(false)

        res.writeHead(302, {
          Location: '/manage',
        })
        res.end()
      }
    )(req, res)
  })
}

const installSlack: RequestHandler = async (req, res) => {
  res.redirect(
    await slackApi.getInstallationUrl([
      'channels:read',
      'chat:write',
      'commands',
      'groups:read',
      'im:history',
      'incoming-webhook',
      'users:read',
      'channels:join',
    ])
  )
}

export default {
  mergeFreeze,
  mergeFreezeModalSubmission,
  mergeUnfreeze,
  mergeUnfreezeSinglePR,
  unfreezeSinglePRModalSubmission,
  slackInstallationCallback,
  installSlack,
}
