import { DataTypes } from 'sequelize/types'
import sequelize from './sequelize'

const GoogleAccount = sequelize.define('googleaccount', {
  id: {
    type: DataTypes.UUID,
  },
  'email': {
    type: DataTypes.TEXT,
  },
  'userId': {
    type: DataTypes.UUID
  },
  'currentUsing': {
    type: DataTypes.BOOLEAN
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

export default GoogleAccount