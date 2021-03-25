import { DataTypes } from 'sequelize/types'
import sequelize from './sequelize'

const EventNote = sequelize.define('eventnote', {
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
})

export default EventNote