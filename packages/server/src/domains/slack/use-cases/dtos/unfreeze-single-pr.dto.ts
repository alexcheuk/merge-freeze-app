export interface UnfreezeSinglePRDTO {
  slackTeamId: string
  requesterId: string
  requesterName: string
  reason: string
  repo: {
    owner: string
    repo: string
  }
  prId: number
}
