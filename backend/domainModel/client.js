const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')

class Client extends Model {}

Client.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userAgent: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.UUID
  },
  'createdAt': {
    type: DataTypes.TIME
  },
  'updatedAt': {
    type: DataTypes.TIME
  },
  'isActive': {
    type: DataTypes.BOOLEAN
  },
  'createdBy': {
    type: DataTypes.UUID
  },
  'updatedBy': {
    type: DataTypes.UUID
  }
}, { sequelize, modelName: 'client', tableName: 'client' })

module.exports =  Client