const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')

class EventNote extends Model {}

EventNote.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'userId': {
    type: DataTypes.UUID,
  },
  'contentText': {
    type: DataTypes.TEXT
  },
  'contentHtml': {
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
}, { sequelize, modelName: 'eventNote', tableName: 'eventnote' })

module.exports = EventNote