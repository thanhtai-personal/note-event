import { DataTypes, Model } from 'sequelize/types'
import sequelize from './sequelize'

class GoogleAccount extends Model { }

GoogleAccount.init({
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
}, { sequelize, modelName: 'googleaccount' })


export default GoogleAccount