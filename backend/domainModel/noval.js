const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')
const { v4: uuidv4, validate: uuidValidate } = require('uuid')

class Noval extends Model { }

Noval.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'name': {
    type: DataTypes.TEXT
  },
  'url': {
    type: DataTypes.TEXT
  },
  'group': {
    type: DataTypes.TEXT
  },
  'shortDescription': {
    type: DataTypes.TEXT
  },
  'imageUrl': {
    type: DataTypes.TEXT
  },
  'imageAltName': {
    type: DataTypes.TEXT
  },
  'intro': {
    type: DataTypes.TEXT
  },
  'chapNumber': {
    type: DataTypes.NUMBER
  },
  'isBlockedScrap': {
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
  sequelize, modelName: 'Noval', tableName: 'noval',
  hooks: {
    beforeCreate: async (noval, options) => {
      if (!uuidValidate(noval.id)) {
        noval.id = uuidv4()
        if (!uuidValidate(noval.createdBy)) {
          noval.createdBy = noval.id
        }
        if (!uuidValidate(noval.updatedBy)) {
          noval.updatedBy = noval.id
        }
      }
    }
  },
})

module.exports = Noval