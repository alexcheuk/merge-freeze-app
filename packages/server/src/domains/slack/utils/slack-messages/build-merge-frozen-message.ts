import { ChatPostMessageArguments } from '@slack/web-api'

interface BuildMergeFrozenMessageOption {
  channelId: string
  requestedByUserId: string
  repos: string[]
  reason?: string
}

export const buildMergeFrozenMessage = ({
  channelId,
  requestedByUserId,
  repos,
  reason,
}: BuildMergeFrozenMessageOption): ChatPostMessageArguments => {
  return {
    channel: channelId,
    text: `:snowflake: *MERGE FREEZE* ${
      reason ? `- ${reason}` : ''
    } :snowflake:`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:

*MERGE FREEZE* ${reason ? `- ${reason}` : ''}

:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:
          `,
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
            text: `*Repo(s):* ${repos.join(', ')}`,
          },
        ],
      },
    ],
  }
}
