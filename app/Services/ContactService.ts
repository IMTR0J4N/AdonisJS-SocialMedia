export default class ContactService {

  constructor(private to: string, private Mailer, private Validation: any) {

  }
  
  async send(params: Record<string, any>) {

    const { validator, schema, rules } = this.Validation

    const payload = await validator.validate({
        schema: schema.create({
            name: schema.string({ trim: true }),
            email: schema.string({ trim: true}, [
                rules.email()
            ]),
            message: schema.string({ trim: true })
        }),
        data: params
    })

    await this.Mailer.send((message) => {
        message
        .from(payload.email)
        .to(this.to)
        .subject('Demande de contact')
        .htmlView('emails/contact', payload)
    })
  }
}
