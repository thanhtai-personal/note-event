const publicRoute = [ 'login', 'register' ]
const { jwtKey } = require('./../env')
const jwt = require('jsonwebtoken')

const checkValidateToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtKey)
    return decoded
  } catch (error) {
    return false
  }
}

const useAuth = (req, res, next) => {
  if (publicRoute.includes(req?.url)) return next() //validate token info
  else if (checkValidateToken(req.headers.token)) return next()
  else return '403 error'
}

module.exports = {
  useAuth
}