import mongoose, { Schema } from 'mongoose'

const MergeFreezeStatusSchema = new Schema({
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

/**
 * Statics
 */

MergeFreezeStatusSchema.statics.getStatusListByRepo = function (owner, repo, query = {}) {
  return this.find({
    repoOwner: owner,
    repoName: repo,
    ...query
  })
}

MergeFreezeStatusSchema.statics.getLastStatus = function (owner, repo, callback) {
  return this.findOne({
    repoOwner: owner,
    repoName: repo
  })
    .sort({ datetime: -1 })
    .exec(callback)
}

MergeFreezeStatusSchema.statics.setFrozen = function ({
  owner, repo, source, id, name, reason, metadata
}, callback) {
  return this.create({
    repoOwner: owner,
    repoName: repo,
    source,
    requesterId: id,
    requester: name,
    isFrozen: true,
    datetime: new Date(),
    reason,
    metadata
  }, callback)
}

MergeFreezeStatusSchema.statics.setUnfrozen = function ({
  owner, repo, source, id, name, metadata
}, callback) {
  return this.create({
    repoOwner: owner,
    repoName: repo,
    source,
    requesterId: id,
    requester: name,
    isFrozen: false,
    datetime: new Date(),
    metadata
  }, callback)
}

/**
 * Register
 */

mongoose.model('MergeFreezeStatus', MergeFreezeStatusSchema)
