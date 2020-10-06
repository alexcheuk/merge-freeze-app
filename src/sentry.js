import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

export default (app) => {
  Sentry.init({
    dsn: 'https://e28fbb2011d6453bae5ba1712cf43c74@o36087.ingest.sentry.io/5454949',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app })
    ]
  })

  app.use(Sentry.Handlers.requestHandler())
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler())
}
