const Client = require('../domainModel/client')
const { jwtKey } = require('./../env')
const jwt = require('jsonwebtoken')

class ClientService extends Client {}

ClientService.generateRefreshToken = async (user, userAgent, expiresIn) => {
  const { id } = user
  const token = await jwt.sign({ userId: id, userAgent }, jwtKey, { expiresIn })
  return token
}

ClientService.getUserAgentByUserId = async (userId) => {
  const clients = await Client.findAll({
    attributes: ['userAgent'],
    where: {
      userId,
      isActive: true
    }
  })
  return clients.dataValues
}

module.exports =  ClientService