const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../sequelize')
const bcrypt = require('bcryptjs')
const { saltPrefix } = require('./../env')
const { v4: uuidv4, validate: uuidValidate } = require('uuid')

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
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
  'lastLoginTime': {
    type: DataTypes.TIME
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
  },
  'roleId': {
    type: DataTypes.UUID
  }
}, {
  modelName: 'user',
  tableName: 'user',
  hooks: {
    beforeCreate: async (user, options) => {
      const salt = bcrypt.genSaltSync(saltPrefix);
      if (!user.roleId) {
        user.set('roleId', '65b68b6b-8c50-48d7-84fd-11998eae02b6')
      }
      if (user.get('password')) {
        user.password = await bcrypt.hashSync(user.password, salt)
      } else {
        user.password = ''
      }
      if (!uuidValidate(user.id)) {
        user.id = uuidv4()
        if (!uuidValidate(user.createdBy)) {
          user.createdBy = user.id
        }
        if (!uuidValidate(user.updatedBy)) {
          user.updatedBy = user.id
        }
      }
    },
    beforeUpdate: async (user, options) => {
      if (uuidValidate(user.id)) {
        user.updatedBy = user.id
      }
    },

  },
  sequelize
})

module.exports =  User