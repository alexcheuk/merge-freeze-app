import { IUseCase } from '@/interfaces/IUseCase'
import { Installation } from '../../entities/installation.entity'

export type IGetInstallation = IUseCase<void, Installation>
