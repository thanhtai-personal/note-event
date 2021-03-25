const publicRoute = [ 'login', 'register' ]

const useAuth = (req, res, next) => {
  if (publicRoute.includes(req?.url)) return next() //validate token info
  else if ('valid token') return next()
  else return '403 error'
}