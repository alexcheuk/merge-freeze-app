import { makeController } from '../../../infrastructure/utils/make-controller'
import { AuthenticatedRequest } from '../../auth/interfaces/controllers/auth-controller'
import { getProfile as getProfileUseCase } from '../use-cases'

export const getProfile = makeController((req: AuthenticatedRequest) => {
  if (req.user?.githubUserId) {
    return getProfileUseCase(req.user)
  } else {
    throw new Error('Profile not found')
  }
})

export default {
  getProfile,
}
