import moment from 'moment'

import { WebClient } from '@slack/web-api'

const SlackAPI = new WebClient()

export const testConnection = async (token) => {
  if (!token) return false

  try {
    await SlackAPI.api.test({
      token
    })

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const generateMergeFreezeReply = ({ user_id, user_name, text, repos }) => {
  return {
    replace_original: 'true',
    response_type: 'in_channel',
    text: `:snowflake: *MERGE FREEZE* ${text ? `- ${text}` : ''} :snowflake:`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:
  
*MERGE FREEZE* ${text ? `- ${text}` : ''}
  
:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:
            `
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Requested By:* <@${user_id}>`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Repo(s):* ${repos}`
          }
        ]
      }
    ]
  }
}

export const generateMergeUnfreezeReply = ({ user_id, user_name, text, repos }) => {
  return {
    response_type: 'in_channel',
    text: `:sunny: *MERGE READY* ${text ? `- ${text}` : ''} :sunny:`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
:sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny:
  
*MERGE READY* ${text ? `- ${text}` : ''}
  
:sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny::sunny:
            `
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Requested By:* <@${user_id}>`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Repo(s):* ${repos}`
          }
        ]
      }
    ]
  }
}

export const generateMergeUnfreezePRReply = ({ user_id, owner, repo, prId }) => {
  return {
    response_type: 'in_channel',
    text: `:sunny: Pull Request #${prId} unfreezed :sunny:`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:sunny: Pull Request <https://github.com/${owner}/${repo}/pull/${prId}|#${prId}> unfreezed`
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Requested By:* <@${user_id}>`
          }
        ]
      }
    ]
  }
}

export const sendWelcomeMessage = ({ token, channelId, repos, installUserId }) => {
  return SlackAPI.chat.postMessage({
    token,
    text: 'Merge Freeze App integrated',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
`
Hey there 👋.
*Merge Freeze* has been added by <@${installUserId}> for ${repos.map(repo => `\`${repo}\``).join(', ')}
`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
`
There are 3 commands available to this channel:

*\`/mf reason?\`* - Merge freezes all opened Pull Requests going into the base branch

*\`/!mf\`* - Unfreeze all opened Pull Requests going into the base branch

*\`/!mfpr pr_number\`* - Unfreeze one Pull Request by PR Number
`
        }
      }
    ],
    channel: channelId
  })
}

export const generateStatsMessage = (allTimeStats, thisMonthStats, lastMonthStats) => {
  return {
    response_type: 'in_channel',
    text: '*:snowflake::chart_with_upwards_trend::sunny: Merge Freeze Usage Stats :sunny::chart_with_downwards_trend::snowflake:*',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*:snowflake::chart_with_upwards_trend::sunny: Merge Freeze Usage Stats :sunny::chart_with_downwards_trend::snowflake:*'
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '*This Month*'
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Average Duration:*\n${moment.duration(thisMonthStats.avg).humanize()}`
          },
          {
            type: 'mrkdwn',
            text: `*# of Merge Freeze:*\n${thisMonthStats.count}`
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '*Last Month*'
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Average Duration:*\n${moment.duration(lastMonthStats.avg).humanize()}`
          },
          {
            type: 'mrkdwn',
            text: `*# of Merge Freeze:*\n${lastMonthStats.count}`
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '*All Time*'
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Average Duration:*\n${moment.duration(allTimeStats.avg).humanize()}`
          },
          {
            type: 'mrkdwn',
            text: `*# of Merge Freeze:*\n${allTimeStats.count}`
          }
        ]
      }
    ]
  }
}
