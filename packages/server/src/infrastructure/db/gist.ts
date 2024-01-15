import { Installation } from '@slack/bolt'

interface GistDBOptions {
  token: string
  fileName: string
  gistId: string
}

export interface GistDBSchema {
  githubUserId?: number
  githubInstallationId?: number
  slackTeamId?: string
  slackInstallation?: Installation<'v2'>
  installedRepos?: {
    owner: string
    repo: string
  }[]
  status?: {
    [repo: string]: boolean
  }
}

export class GistDatabase {
  token: string
  fileName: string
  gistId: string

  constructor({ token, fileName, gistId }: GistDBOptions) {
    this.token = token
    this.fileName = fileName
    this.gistId = gistId
  }

  getData = async (): Promise<GistDBSchema> => {
    const req = await fetch(`https://api.github.com/gists/${this.gistId}`)
    const gist = await req.json()

    return JSON.parse(gist.files[this.fileName].content)
  }

  setData = async (data: GistDBSchema) => {
    const req = await fetch(`https://api.github.com/gists/${this.gistId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        files: {
          [this.fileName]: {
            content: JSON.stringify(data),
          },
        },
      }),
    })
    return req.json()
  }
}

export const GistDB = new GistDatabase({
  fileName: process.env.GIST_FILENAME || '',
  gistId: process.env.GIST_ID || '',
  token: process.env.GIST_TOKEN || '',
})
