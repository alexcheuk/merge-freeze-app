import { ChatPostMessageArguments } from '@slack/web-api'

interface BuildMergeUnfreezeMessageOption {
  channelId: string
  requestedByUserId: string
  repos: string[]
}

export const buildMergeUnfreezeMessage = ({
  channelId,
  requestedByUserId,
  repos,
}: BuildMergeUnfreezeMessageOption): ChatPostMessageArguments => {
  return {
    channel: channelId,
    text: `:sunny: *MERGE READY* :sunny:`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
:sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny:
  
*MERGE READY*
  
:sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny:
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
