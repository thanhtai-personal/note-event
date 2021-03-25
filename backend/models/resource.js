import { DataTypes } from 'sequelize/types'
import sequelize from './sequelize'

const Resource = sequelize.define('resource', {
  id: {
    type: DataTypes.UUID,
  },
  'name': {
    type: DataTypes.TEXT,
  },
  'userId': {
    type: DataTypes.UUID
  },
  'accountId': {
    type: DataTypes.UUID
  },
  'eventId': {
    type: DataTypes.UUID
  },
  'description': {
    type: DataTypes.TEXT
  },
  'url': {
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

export default Resource