import { DataTypes, Model } from 'sequelize/types'
import sequelize from './sequelize'

class EventNote extends Model {}

EventNote.init({
  id: {
    type: DataTypes.UUID,
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
    type: DataTypes.Time
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
}, { sequelize, modelName: 'eventnote' })

export default EventNote