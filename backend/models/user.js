import { DataTypes } from 'sequelize/types'
import sequelize from './sequelize'

const User = sequelize.define(`"user"`, {
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
})

export default User