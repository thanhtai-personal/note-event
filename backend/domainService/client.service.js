const Client = require('../domainModel/client')
const { jwtKey } = require('./../env')
const jwt = require('jsonwebtoken')

class ClientService extends Client {}

ClientService.generateRefreshToken = (user, clientInfo, expiresIn) => {
  const { id } = user
  const { userAgent } = clientInfo
  const token = jwt.sign({ userId: id, userAgent }, jwtKey, { expiresIn })
  return token
}

module.exports =  ClientService