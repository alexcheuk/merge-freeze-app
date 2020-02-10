import passport from 'passport'

export const getAuthGithub = passport.authenticate('github')

export const getAuthGithubCallback = (req, res) => {
  // Successful authentication, redirect home.
  if (req.session.redirectTo) {
    res.redirect(req.session.redirectTo)
    req.session.redirectTo = null
    return
  }
  res.redirect('/manage')
}
