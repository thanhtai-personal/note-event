import { DataTypes, Model } from 'sequelize'
import sequelize from './../sequelize'

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
}, { sequelize, modelName: 'eventNote', tableName: 'eventnote' })

export default EventNote