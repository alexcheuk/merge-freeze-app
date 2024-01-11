import { GetProfileDTO } from '../interfaces/dtos/get-profile'
import { ProfileDTO } from '../interfaces/dtos/profile'

export const makeGetProfile = () => {
  return ({ name, avatarUrl, email }: GetProfileDTO): ProfileDTO => {
    return { name, avatarUrl, email }
  }
}
