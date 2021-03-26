import { DataTypes, Model } from 'sequelize/types'
import sequelize from './sequelize'

class GoogleAccount extends Model { }

GoogleAccount.init({
  id:  DataTypes.UUID,
  'email':  DataTypes.TEXT,
  'userId':  DataTypes.UUID,
  'currentUsing':  DataTypes.BOOLEAN,
  'createdTime':  DataTypes.Time,
  'updatedTime':  DataTypes.TIME,
  'isActive':  DataTypes.BOOLEAN,
  'createdBy':  DataTypes.UUID,
  'updatedBy':  DataTypes.UUID
}, { sequelize, modelName: 'googleaccount' })


export default GoogleAccount