import cookie from 'cookie'
import { Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as GitHubStrategy } from 'passport-github2'
import passport from 'passport'
import { Request } from 'express'
import { IncomingMessage } from 'http'
import { UserJWTPayload } from '../interfaces/dtos/user-jwt-payload'

const cookieExtractor = (req: Request | IncomingMessage) => {
  let jwt = null

  if (req && 'cookies' in req) {
    jwt = req.cookies['auth']
  } else {
    const cookies = cookie.parse(req.headers['cookie'] || '')

    jwt = cookies['auth']
  }

  return jwt
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload: UserJWTPayload, done) {
      if (!jwtPayload?.githubUserId) {
        return done(new Error())
      }
      return done(null, jwtPayload)
    }
  )
)
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '',
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: (arg0: null, arg1: any) => void
    ) => {
      cb(null, profile)
    }
  )
)
