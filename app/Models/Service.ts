import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public serviceName: string

  @column()
  public serviceTitle: string

  @column()
  public serviceIp: string

  @column.dateTime()
  public serviceLastUsage: DateTime

  @column()
  public serviceAllUsage: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // public serializeExtras = true
  // pivotTimestamps: true
}