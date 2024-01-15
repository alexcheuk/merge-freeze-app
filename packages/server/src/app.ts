import './infrastructure/configs/env'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import slackRouter from './domains/slack/routes'
import githubRouter from './domains/github/routes'
import authRouter from './domains/auth/routes'
import userRouter from './domains/user/routes'
import installationRouter from './domains/installation/routes'
import { initialize as initializeMongoose } from './infrastructure/db/mongoose'

import DevTunnel from './infrastructure/configs/dev.tunnel'

if (import.meta.env.DEV) DevTunnel()

const app = express()

initializeMongoose()

app.use(morgan('common'))

app.use(slackRouter)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(githubRouter)
app.use(authRouter)
app.use(userRouter)
app.use(installationRouter)

app.use('*', (req, res) => {
  res.status(404).send('404')
})

app.use(
  '/api/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Works')
  }
)

if (import.meta.env.PROD) {
  console.log(`/mf application running on port: 3000`)
  app.listen(3000)
}

export const viteNodeApp = app
