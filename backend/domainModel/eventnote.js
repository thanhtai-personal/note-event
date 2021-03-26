import { DataTypes, Model } from 'sequelize/types'
import sequelize from './sequelize'

class EventNote extends Model {}

EventNote.init({
  id: DataTypes.UUID,
  'userId': DataTypes.UUID,
  'contentText': DataTypes.TEXT,
  'contentHtml': DataTypes.TEXT,
  'createdTime': DataTypes.Time,
  'updatedTime': DataTypes.TIME,
  'isActive': DataTypes.BOOLEAN,
  'createdBy': DataTypes.UUID,
  'updatedBy': DataTypes.UUID
}, { sequelize, modelName: 'eventnote' })

export default EventNote