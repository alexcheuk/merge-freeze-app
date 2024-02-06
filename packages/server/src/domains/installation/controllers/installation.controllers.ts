import {
  getInstallationByGithubUserId,
  uninstall as uninstallUseCase,
} from '../use-cases'
import {
  AuthenticatedRequest,
  AuthenticatedRequestHandler,
} from '../../auth/interfaces/controllers/auth-controller'
import { makeController } from '../../../infrastructure/utils/make-controller'

export const getInstallation = makeController(
  async (req: AuthenticatedRequest) => {
    const githubUserId = req.user.githubUserId

    const installation = await getInstallationByGithubUserId({
      githubUserId,
    })

    return installation
  }
)

export const uninstall: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const githubUserId = req.user.githubUserId

    await uninstallUseCase({
      githubUserId,
    })

    res.status(200).end()
  } catch (e) {
    next(e)
  }
}

export default {
  getInstallation,
  uninstall,
}
