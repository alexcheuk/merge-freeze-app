import { IProfileApi } from '../interfaces/api/IProfileApi'
import { IProfileModel } from '../interfaces/models/IProfileModel'

interface Dependency {
  ProfileModel: IProfileModel
}

export const makeProfileApi = ({ ProfileModel }: Dependency): IProfileApi => {
  return {
    get: () => {
      return ProfileModel.get()
    },
  }
}
