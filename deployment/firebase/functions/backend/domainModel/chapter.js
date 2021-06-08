const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./../sequelize')
const { v4: uuidv4, validate: uuidValidate } = require('uuid')

class Chapter extends Model { }

Chapter.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  'novalId': {
    type: DataTypes.TEXT
  },
  'title': {
    type: DataTypes.TEXT
  },
  'url': {
    type: DataTypes.TEXT
  },
  'content': {
    type: DataTypes.TEXT
  },
  'isCrawledSuccess': {
    type: DataTypes.BOOLEAN
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
  sequelize, modelName: 'Chapter', tableName: 'chapter',
  hooks: {
    beforeCreate: async (chapter, options) => {
      if (!uuidValidate(chapter.id)) {
        chapter.id = uuidv4()
        if (!uuidValidate(chapter.createdBy)) {
          chapter.createdBy = chapter.id
        }
        if (!uuidValidate(chapter.updatedBy)) {
          chapter.updatedBy = chapter.id
        }
      }
    }
  },
})

module.exports = Chapter