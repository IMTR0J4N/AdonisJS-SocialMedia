import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class UpdatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(3)]),
    categoryId: schema.number.nullableAndOptional([
      rules.exists({ column: Category.primaryKey, table: Category.table }),
    ]),
    thumbnailFile: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
    content: schema.string({ trim: true }),
    online: schema.boolean.nullableAndOptional(),
  })

  public messages: CustomMessages = {}
}
