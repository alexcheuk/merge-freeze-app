export interface MergeFreezeModalSubmissionValuesDTO {
  reason_block?: {
    reason_input: {
      value: string
    }
  }
  repo_block?: {
    repo_input: {
      type: string
      selected_options: { text: string; value: string }[]
    }
  }
}
