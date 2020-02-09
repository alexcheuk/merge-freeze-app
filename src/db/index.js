import mongoose from 'mongoose'

const uri = process.env.MONGO_DB_URL

mongoose.connect(uri, { useNewUrlParser: true })

const MergeFreezeStatus = mongoose.model('MergeFreezeStatus', {
  repoOwner: String,
  repoName: String,
  source: String,
  requesterId: String,
  requester: String,
  reason: String,
  isFrozen: Boolean,
  datetime: Date,
  metadata: Object
})

const SlackRepoIntegration = mongoose.model('SlackRepoIntegration', {
  owner: String,
  name: String,
  id: String
})

const getGithubRepo = async () => {
  const owner = process.env.REPO_OWNER
  const repo = process.env.REPO_NAME

  return {
    owner,
    repo
  }
}

const isFrozen = async (owner, repo) => {
  const latestStatus = await MergeFreezeStatus.findOne({
    repoOwner: owner,
    repoName: repo
  }).sort({ datetime: -1 })

  if (latestStatus) {
    return latestStatus.isFrozen
  }
  return false
}

const getLatestStatus = async (owner, repo) => {
  const latestStatus = await MergeFreezeStatus.findOne({
    repoOwner: owner,
    repoName: repo
  }).sort({ datetime: -1 })

  return latestStatus
}

const setFrozen = async ({
  owner, repo, source, id, name, reason, metadata
}) => {
  const frozenStatus = new MergeFreezeStatus({
    repoOwner: owner,
    repoName: repo,
    source,
    requesterId: id,
    requester: name,
    isFrozen: true,
    datetime: new Date(),
    reason,
    metadata
  })

  return frozenStatus.save()
}

const setUnfrozen = async ({
  owner, repo, source, id, name, metadata
}) => {
  const frozenStatus = new MergeFreezeStatus({
    repoOwner: owner,
    repoName: repo,
    source,
    requesterId: id,
    requester: name,
    isFrozen: false,
    datetime: new Date(),
    metadata
  })

  return frozenStatus.save()
}

const saveSlackRepoIntegration = async (slackId, repoOwner, repoName) => {
  const newRepo = new SlackRepoIntegration({
    id: slackId,
    name: repoName,
    owner: repoOwner
  })

  return SlackRepoIntegration.findOneAndUpdate()
}

const getSlackRepoIntegration = async (slackId) => SlackRepoIntegration.findOne({
  id: slackId
})

export {
  getGithubRepo,
  isFrozen,
  getLatestStatus,
  setFrozen,
  setUnfrozen,
  saveSlackRepoIntegration,
  getSlackRepoIntegration
}
