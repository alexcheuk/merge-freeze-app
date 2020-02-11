import { WebClient } from '@slack/web-api'

const SlackAPI = new WebClient(process.env.SLACK_ACCESS_TOKEN)

export const openConfirmationDialog = async (triggerId, reason) => {
  return SlackAPI.dialog.open({
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

export const getBotInfo = async (botID) => {
  return SlackAPI.users.info({
    user: botID
  })
}
