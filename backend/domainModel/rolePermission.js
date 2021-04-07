const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../sequelize')

class RolePermission extends Model { }

RolePermission.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'permissionId': {
    type: DataTypes.UUID,
  },
  'roleId': {
    type: DataTypes.UUID,
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
  modelName: 'rolePermission',
  tableName: 'role_permission',
  sequelize
})

module.exports =  RolePermission