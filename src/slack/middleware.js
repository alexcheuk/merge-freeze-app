import crypto from 'crypto'
import qs from 'qs'

export const verifySignature = (req, res, next) => {
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET

  const slackSignature = req.headers['x-slack-signature']
  const requestBody = qs.stringify(req.body, { format: 'RFC1738' })
  const timestamp = req.headers['x-slack-request-timestamp']

  const sigBasestring = `v0:${timestamp}:${requestBody}`

  const mySignature = `v0=${
    crypto.createHmac('sha256', slackSigningSecret)
      .update(sigBasestring, 'utf8')
      .digest('hex')}`

  if (crypto.timingSafeEqual(
    Buffer.from(mySignature, 'utf8'),
    Buffer.from(slackSignature, 'utf8')
  )) {
    next()
  } else {
    return res.status(400).send('Verification failed')
  }
}

export const isAllowedChannel = (req, res, next) => {
  const allowedChannel = process.env.ALLOWED_CHANNELS

  if (!allowedChannel) return next()

  if (allowedChannel.split(',').map(ch => ch.toLowerCase()).find(req.body.channel_name)) return res.send('Not allowed in this channel')

  next()
}

export default verifySignature
