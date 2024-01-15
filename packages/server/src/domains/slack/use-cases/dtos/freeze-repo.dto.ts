export interface FreezeRepoDTO {
  slackTeamId: string
  requesterId: string
  requesterName: string
  reason: string
  repo: {
    owner: string
    repo: string
  }
}

export interface FreezeRepoOptions {
  installationId?: number
}
