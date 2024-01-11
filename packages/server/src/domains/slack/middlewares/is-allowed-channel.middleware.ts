import { Middleware, SlackCommandMiddlewareArgs } from '@slack/bolt'

export const isAllowedChannel: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  body,
  next,
}) => {
  const allowedChannels = process.env.ALLOWED_CHANNELS

  if (!allowedChannels) return next()

  if (
    !allowedChannels
      .split(',')
      .map((ch) => ch.toLowerCase())
      .includes(body.channel_name)
  )
    return await ack(
      `Merge freeze actions are not allowed in channels: \`${allowedChannels}\``
    )

  next()
}
