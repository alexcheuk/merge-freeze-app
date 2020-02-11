export const generateMergeFreezeReply = ({ user_id, user_name, text }, numPRs) => {
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
      }
    ]
  }
}

export const generateMergeUnfreezeReply = ({ user_id, user_name, text }, numPRs) => {
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
      }
    ]
  }
}

export const generateMergeUnfreezePRReply = ({ user_id, user_name, text }) => {
  const owner = process.env.REPO_OWNER
  const repo = process.env.REPO_NAME

  return {
    response_type: 'in_channel',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:sunny: Pull Request <https://github.com/${owner}/${repo}/pull/16|#${text}> unfreezed`
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
