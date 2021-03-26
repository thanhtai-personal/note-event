import { DataTypes,  Model } from 'sequelize/types'
import sequelize from './sequelize'

class Resource extends Model { }

Resource.init({
  id: DataTypes.UUID,
  'name': DataTypes.TEXT,
  'userId': DataTypes.UUID,
  'accountId': DataTypes.UUID,
  'eventId': DataTypes.UUID,
  'description': DataTypes.TEXT,
  'url': DataTypes.TEXT,
  'createdTime': DataTypes.Time,
  'updatedTime': DataTypes.TIME,
  'isActive': DataTypes.BOOLEAN,
  'createdBy': DataTypes.UUID,
  'updatedBy': DataTypes.UUID,
}, {
  sequelize, modelName: 'resource'
})

export default Resource