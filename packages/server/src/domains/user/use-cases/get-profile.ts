import { GetProfileDTO } from './dtos/get-profile'
import { ProfileDTO } from './dtos/profile'

export const makeGetProfile = () => {
  return ({ name, avatarUrl, email }: GetProfileDTO): ProfileDTO => {
    return { name, avatarUrl, email }
  }
}
