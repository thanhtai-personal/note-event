import { DataTypes,  Model } from 'sequelize/types'
import sequelize from './sequelize'

class Resource extends Model { }

Resource.init({
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
}, {
  sequelize, modelName: 'resource'
})

export default Resource