const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'username': {
    type: DataTypes.TEXT,
  },
  'googleId': {
    type: DataTypes.UUID
  },
  'password': {
    type: DataTypes.TEXT
  },
  'token': {
    type: DataTypes.TEXT
  },
  'lastLoginTime': {
    type: DataTypes.TIME
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
}, {
  modelName: 'user',
  tableName: 'user',
  sequelize
})

module.exports =  User