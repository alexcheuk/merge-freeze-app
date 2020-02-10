export const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.session.redirectTo = req.originalUrl
    return res.redirect('/auth/github')
  }

  next()
}
