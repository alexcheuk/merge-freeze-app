import { GistDB, GistDBSchema } from '../../../../infrastructure/db/gist'
import { Installation } from '../entities/installation.entity'
import { InstallationModel as IInstallationModel } from './installation.model.interface'

const mapResultToEntity = (res: GistDBSchema): Installation => {
  return new Installation({
    configuration: undefined,
    githubInstallationId: res.githubInstallationId,
    githubUserId: res.githubUserId,
    installedRepos: res.installedRepos,
    slackInstallation: res.slackInstallation,
    slackTeamId: res.slackTeamId,
  })
}

export const InstallationModel: IInstallationModel = {
  findOneAndUpdate: async (filter, update) => {
    let data = await GistDB.getData()

    data = {
      ...data,
      ...update,
    }

    await GistDB.setData(data)

    return mapResultToEntity(data)
  },
  findOne: async () => {
    return mapResultToEntity(await GistDB.getData())
  },
  deleteMany: async () => {
    await GistDB.setData({})

    return
  },
}
