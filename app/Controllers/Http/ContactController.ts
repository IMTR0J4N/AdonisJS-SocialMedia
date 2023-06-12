import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactService from '@ioc:ContactService';

export default class ContactController {
  public async contact({ view }: HttpContextContract) {
    return view.render('contact')
  }

  public async store({ request, session, response }: HttpContextContract) {
    ContactService.send(request.all() as any)

    session.flash('success', 'Votre demande de contact a bien été envoyé')

    return response.redirect().back()
  }
}
