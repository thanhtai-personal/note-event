const { DataTypes, Model } = require('sequelize')
const sequelize = require('./../sequelize')

class GoogleAccount extends Model { }

GoogleAccount.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'email': {
    type: DataTypes.TEXT,
  },
  'userId': {
    type: DataTypes.UUID
  },
  'currentUsing': {
    type: DataTypes.BOOLEAN
  },
  'createdTime': {
    type: DataTypes.TIME
  },
  'updatedTime': {
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
}, { sequelize, modelName: 'googleAccount', tableName: 'googleaccount' })


module.exports =  GoogleAccount