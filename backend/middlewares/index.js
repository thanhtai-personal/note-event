const { LOGIN, REGISTER } = require('./../controller/routePaths')
const publicRoute = [LOGIN, REGISTER]
const authenService = require('./../applicationService/authenticate.service')

const checkValidateToken = (token, refreshToken) => {
  try {
    const authData = authenService.getAuthDataByToken(token, refreshToken, userAgent)
    return authData || {}
  } catch (error) {
    return false
  }
}

const useAuth = (req, res, next) => {
  if (publicRoute.includes(req.url)) return next() //validate token info
  else {
    const validateToken = checkValidateToken(req.headers.token, req.headers.refreshToken, req.headers.userAgent)
    if (validateToken) {
      req.authData = validateToken.user
      if (validateToken.token) req.headers.token = validateToken.token
      return next()
    } else return '403 error'
  } 
}

module.exports = {
  useAuth
}