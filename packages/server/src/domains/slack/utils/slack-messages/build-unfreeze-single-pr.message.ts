import { ChatPostMessageArguments } from '@slack/web-api'

interface BuildUnfreezeSinglePRMessageOption {
  channelId: string
  requestedByUserId: string
  repo: {
    owner: string
    repo: string
  }
  prId: string
}

export const buildUnfreezeSinglePRMessage = ({
  channelId,
  requestedByUserId,
  repo: { owner, repo },
  prId,
}: BuildUnfreezeSinglePRMessageOption): ChatPostMessageArguments => {
  return {
    channel: channelId,
    text: `:sunny: Pull Request <https://github.com/${owner}/${repo}/pull/${prId}|#${prId}> unfreezed`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:sunny: Pull Request <https://github.com/${owner}/${repo}/pull/${prId}|#${prId}> unfreezed`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Requested By:* <@${requestedByUserId}>`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Repo:* ${owner}/${repo}`,
          },
        ],
      },
    ],
  }
}
