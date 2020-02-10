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

export const sendWelcomeMessage = (token, channelId) => {
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
There are 3 commands available to this channel:
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
