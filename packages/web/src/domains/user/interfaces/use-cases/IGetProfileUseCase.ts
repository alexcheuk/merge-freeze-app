import { IUseCase } from '@/interfaces/IUseCase'
import { Profile } from '../../entities/profile.entity'

export type IGetProfileUseCase = IUseCase<void, Profile>
