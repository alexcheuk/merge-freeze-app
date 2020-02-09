import { WebClient } from '@slack/web-api'

const slackapi = new WebClient(process.env.SLACK_ACCESS_TOKEN)

const generateMergeFreezeReply = ({ user_id, user_name, text }, numPRs) => {
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
            text: `*# PRs:* ${numPRs}`
          }
        ]
      }
    ]
  }
}

const generateMergeUnfreezeReply = ({ user_id, user_name, text }, numPRs) => {
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
            text: `*# PRs:* ${numPRs}`
          }
        ]
      }
    ]
  }
}

const generateMergeUnfreezePRReply = ({ user_id, user_name, text }) => {
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

const openConfirmationDialog = async (triggerId, reason) => {
  return slackapi.dialog.open({
    trigger_id: triggerId,
    dialog: {
      callback_id: 'confirm_merge_freeze',
      title: 'Are you sure?',
      submit_label: 'Submit',
      elements: [
        {
          type: 'text',
          label: 'Reason',
          name: 'reason',
          value: reason,
          placeholder: 'Reason for Merge Freeze',
          optional: true
        }
      ]
    }
  }).catch(res => console.log(res))
}

const getBotInfo = async (botID) => {
  return slackapi.users.info({
    user: botID
  })
}

export { generateMergeFreezeReply, generateMergeUnfreezeReply, generateMergeUnfreezePRReply, openConfirmationDialog, getBotInfo, slackapi }
