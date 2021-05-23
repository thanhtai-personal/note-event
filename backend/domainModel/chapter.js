const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')

class Chapter extends Model {}

Chapter.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'novalId': {
    type: DataTypes.TEXT
  },
  'title': {
    type: DataTypes.TEXT
  },
  'url': {
    type: DataTypes.TEXT
  },
  'content': {
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
}, { sequelize, modelName: 'Chapter', tableName: 'chapter' })

module.exports =  Chapter