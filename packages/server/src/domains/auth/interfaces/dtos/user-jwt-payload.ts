export interface UserJWTPayload {
  githubUserId: number
  name: string
  email?: string
  avatarUrl?: string
}
