const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../sequelize')

class Role extends Model { }

Role.init({
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
  modelName: 'role',
  tableName: 'role',
  hooks: {
    beforeCreate: async (role, options) => {
      if ((role.get('name') || '').toLowerCase() === 'superadmin') {
        sequelize.Promise.reject('Cannot create role supper admin')
        throw new Error('cannot register role super admin')
      }
      if (!uuidValidate(role.id)) {
        role.id = uuidv4()
      }
    },
    beforeUpdate: async (role, options) => {
      if ((role.get('name') || '').toLowerCase() === 'superadmin') {
        sequelize.Promise.reject('Cannot update role to be a supper admin')
        throw new Error('Cannot update role to be a super admin')
      }
    },

  },
  sequelize
})

module.exports =  Role