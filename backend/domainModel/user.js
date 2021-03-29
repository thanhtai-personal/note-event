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
  }
}, {
  modelName: 'user',
  tableName: 'user',
  hooks: {
    beforeCreate: async (user, options) => {
      const salt = bcrypt.genSaltSync(saltPrefix);
      const hashedPassword = await bcrypt.hashSync(user.password, salt)
      user.password = hashedPassword
      if (!uuidValidate(user.id)) {
        user.id = uuidv4()
        user.createdBy = user.id
        user.updatedBy = user.id
      }

    }
  },
  sequelize
})

module.exports =  User