const { DataTypes,  Model } = require('sequelize/types')
const { sequelize } = require('./../sequelize')

class Resource extends Model { }

Resource.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'name': {
    type: DataTypes.TEXT,
  },
  'userId': {
    type: DataTypes.UUID
  },
  'accountId': {
    type: DataTypes.UUID
  },
  'eventId': {
    type: DataTypes.UUID
  },
  'description': {
    type: DataTypes.TEXT
  },
  'url': {
    type: DataTypes.TEXT
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
}, {
  sequelize, modelName: 'resource', tableName: 'resource'
})

module.exports =  Resource