import { Strategy as GitHubStrategy } from 'passport-github2'
import passport from 'passport'

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function (accessToken, refreshToken, profile, cb) {
  // console.log(accessToken, refreshToken, profile)
  cb(null, profile)
}
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  done(null, id)
})
