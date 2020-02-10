import mongoose from 'mongoose'

export const GithubInstallation = mongoose.model('GithubInstallation', {
  userId: Number,
  installationId: Number,
  slackBotToken: String,
  slackTeamId: String
})

export const getInstallationBySlackTeamId = async (slackTeamId) => {
  return GithubInstallation.findOne({
    slackTeamId
  }).sort({ _id: -1 })
}

export const getInstallationByGithubUserId = async (userId) => {
  return GithubInstallation.findOne({
    userId
  }).sort({ _id: -1 })
}

export const saveSlackIntegration = async (userId, slackTeamId, slackBotToken) => {
  return GithubInstallation.findOneAndUpdate({
    userId
  }, {
    slackTeamId,
    slackBotToken
  }, {
    upsert: true
  })
}

export const saveGithubInstallation = async (userId, installationId) => {
  return GithubInstallation.findOneAndUpdate({
    userId,
    installationId
  }, {
    userId,
    installationId
  }, {
    upsert: true
  })
}

export const deleteGithubInstallation = async (userId, installationId) => {
  return GithubInstallation.deleteMany({
    userId
  })
}
