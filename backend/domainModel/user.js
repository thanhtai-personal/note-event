import { DataTypes,  Model } from 'sequelize/types'
import sequelize from './sequelize'

class User extends Model { }

User.init({
  id: DataTypes.UUID,
  'username': DataTypes.TEXT,
  'googleId': DataTypes.UUID,
  'password': DataTypes.TEXT,
  'token': DataTypes.TEXT,
  'lastLoginTime': DataTypes.Time,
  'createdTime': DataTypes.Time,
  'updatedTime': DataTypes.TIME,
  'isActive': DataTypes.BOOLEAN,
  'createdBy': DataTypes.UUID,
  'updatedBy': DataTypes.UUID
}, {
  sequelize, modelName: 'user'
})

export default User