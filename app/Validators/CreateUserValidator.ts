import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    displayName: schema.string.nullableAndOptional({ trim: true }, [ rules.minLength(3) ]),
    username: schema.string({ trim: true }, [rules.minLength(2)]),
    email: schema.string([rules.email(), rules.normalizeEmail({
      allLowercase: true,
      gmailConvertGooglemaildotcom: true,
    })]),
    password: schema.string(),
  })

  public messages: CustomMessages = {}
}
