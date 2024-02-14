import { ProfileApi } from '../../../../data/user/api'
import { Profile } from '../../entities/profile.entity'
import { makeGetProfileUseCase } from './get-profile'

export const getProfile = makeGetProfileUseCase({
  getProfile: ProfileApi.get,
  Profile,
})
