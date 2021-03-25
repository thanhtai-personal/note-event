import { DataTypes,  Model } from 'sequelize/types'
import sequelize from './sequelize'

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
  },
  'username': {
    type: DataTypes.TEXT,
  },
  'googleId': {
    type: DataTypes.UUID
  },
  'password': {
    type: DataTypes.TEXT
  },
  'token': {
    type: DataTypes.TEXT
  },
  'lastLoginTime': {
    type: DataTypes.Time
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
  sequelize, modelName: 'user'
})

export default User