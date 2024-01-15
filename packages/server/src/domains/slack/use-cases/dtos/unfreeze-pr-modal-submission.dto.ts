export interface UnfreezeSinglePRModalSubmissionDTO {
  repo_block?: {
    repo_input: {
      selected_option: { text: string; value: string }
    }
  }
  prid_block?: {
    prid_input: {
      type: string
      value: string
    }
  }
}
