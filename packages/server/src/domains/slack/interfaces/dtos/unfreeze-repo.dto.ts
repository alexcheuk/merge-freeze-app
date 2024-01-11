export interface UnfreezeRepoDTO {
  slackTeamId: string
  requesterId: string
  requesterName: string
  reason: string
  repo: {
    owner: string
    repo: string
  }
}

export interface UnfreezeRepoOptions {
  installationId?: number
}
