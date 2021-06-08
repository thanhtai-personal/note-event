const { DataTypes, Model } = require('sequelize')
const { v4: uuidv4, validate: uuidValidate } = require('uuid')
const { sequelize } = require('./../sequelize')

class GoogleAccount extends Model { }

GoogleAccount.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'email': {
    type: DataTypes.TEXT,
  },
  'token': {
    type: DataTypes.TEXT,
  },
  'userId': {
    type: DataTypes.UUID
  },
  'currentUsing': {
    type: DataTypes.BOOLEAN
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
  hooks: {
    beforeCreate: (instant, options) => {
      if (!uuidValidate(instant.get('id'))) {
        instant.id = uuidv4()
      }
    }
  },
  sequelize, modelName: 'googleAccount', tableName: 'googleaccount'
})


module.exports = GoogleAccount