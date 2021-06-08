const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../sequelize')

class Permission extends Model { }

Permission.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'name': {
    type: DataTypes.TEXT,
  },
  'createdAt': {
    type: DataTypes.TIME
  },
  'updatedAt': {
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
  modelName: 'permission',
  tableName: 'permission',
  sequelize
})

module.exports =  Permission