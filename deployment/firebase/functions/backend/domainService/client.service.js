const Client = require('../domainModel/client')
const { jwtKey } = require('./../env')
const jwt = require('jsonwebtoken')

Client.generateRefreshToken = async (user, userAgent, expiresIn) => {
  const { id } = user
  const token = await jwt.sign({ userId: id, userAgent }, jwtKey, { expiresIn })
  return token
}

Client.getUserAgentByUserId = async (userId) => {
  const clients = await Client.findAll({
    attributes: ['userAgent'],
    where: {
      userId,
      isActive: true
    },
    raw: true,
    nest: true,
  })
  return clients
}

module.exports =  Client