import { Checkboxes, SlashCommand } from '@slack/bolt'
import { ViewsOpenArguments } from '@slack/web-api'
import { MERGE_FREEZE_MODAL_CALLBACK_ID } from './constants'

interface BuildMergeFreezeModalOptions {
  triggerId: SlashCommand['trigger_id']
  channelId: SlashCommand['channel_id']
  repos: Checkboxes['options']
  reason?: string
}

export const buildMergeFreezeModal = ({
  triggerId,
  channelId,
  repos,
  reason = '',
}: BuildMergeFreezeModalOptions): ViewsOpenArguments => {
  return {
    trigger_id: triggerId,
    view: {
      type: 'modal',
      callback_id: MERGE_FREEZE_MODAL_CALLBACK_ID,
      title: {
        type: 'plain_text',
        text: 'Are you sure?',
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
      },
      private_metadata: channelId,
      blocks: [
        {
          type: 'input',
          block_id: 'reason_block',
          label: {
            type: 'plain_text',
            text: 'Reason for merge freeze',
          },
          element: {
            type: 'plain_text_input',
            action_id: 'reason_input',
            multiline: true,
            placeholder: {
              text: 'ie. Staging tests are failing',
              type: 'plain_text',
            },
            focus_on_load: true,
            initial_value: reason,
          },
          optional: true,
        },
        {
          type: 'input',
          block_id: 'repo_block',
          label: {
            type: 'plain_text',
            text: 'Projects',
          },
          element: {
            type: 'checkboxes',
            action_id: 'repo_input',
            initial_options: repos,
            options: repos,
          },
        },
      ],
    },
  }
}
