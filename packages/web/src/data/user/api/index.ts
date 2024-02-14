import { ProfileModel } from '../models/profile.model'
import { makeProfileApi } from './profile.api'

export const ProfileApi = makeProfileApi({
  ProfileModel: ProfileModel,
})
