export interface FreezeReposDTO {
  slackTeamId: string
  requesterId: string
  requesterName: string
  reason: string
  repos: {
    owner: string
    repo: string
  }[]
}
