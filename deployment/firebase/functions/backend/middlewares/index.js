const { LOGIN, REGISTER, SEARCH_NOVALS } = require('./../controller/routePaths')
const publicRoute = [LOGIN, REGISTER, SEARCH_NOVALS]
const AuthenService = require('./../applicationService/authenticate.service')
const userService = require('./../domainService/user.service')
const clientService = require('./../domainService/client.service')

const authenService = AuthenService(userService, clientService)

const checkValidateToken = async (token, refreshToken, userAgent) => {
  try {
    const authData = await authenService.getAuthDataByToken(token, refreshToken, userAgent)
    return authData || {}
  } catch (error) {
    return false
  }
}

const useAuth = async (req, res, next) => {
  try {
    if (publicRoute.includes(req.url)) return next() //validate token info
    else {
      const validateToken = await checkValidateToken(req.headers.token, req.headers.refreshtoken, req.headers['user-agent'])
      if (validateToken) {
        req.authData = validateToken.user
        if (validateToken.token) req.headers.token = validateToken.token
        return next()
      } else return res.status(403).send({
        message: 'you have not permission to do something here'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  useAuth
}