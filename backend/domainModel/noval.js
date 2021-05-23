const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')

class Noval extends Model {}

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
}, { sequelize, modelName: 'Noval', tableName: 'noval' })

module.exports =  Noval