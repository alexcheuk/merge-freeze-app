import { IProfileApi } from '@/data/user/interfaces/api/IProfileApi'
import { IGetProfileUseCase } from '../../interfaces/use-cases/IGetProfileUseCase'
import { Profile } from '../../entities/profile.entity'

interface Dependency {
  getProfile: IProfileApi['get']
  Profile: typeof Profile
}

export const makeGetProfileUseCase = ({
  getProfile,
  Profile,
}: Dependency): IGetProfileUseCase => {
  return async () => {
    const profile = await getProfile().then((res) => res.data)

    return new Profile({
      name: profile.name,
      avatarUrl: profile.avatarUrl,
      email: profile.email,
    })
  }
}
