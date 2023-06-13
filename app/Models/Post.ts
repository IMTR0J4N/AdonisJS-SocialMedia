import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public online: boolean

  @column()
  public thumbnail: string | null

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public categoryId: number | null

  @column()
  public userId: number

  @column()
  public author: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
