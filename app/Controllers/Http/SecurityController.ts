import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class SecurityController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async doLogin({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('home')
    } catch {
      session.flash({ error: 'Identifiants incorrect' })
      response.redirect().toRoute('login')
    }
  }

  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async doRegister({ request, response }: HttpContextContract) {
    const newUser = new User
    const data = await request.validate(CreateUserValidator)

    newUser
      .merge({
        displayName: data.displayName === 'facultatif' ? null : data.displayName,
        username: data.username,
        email: data.email,
        password: data.password
      })
      .save()

    response.redirect().toRoute('login')
  }

  public async disconnect({ auth, response }: HttpContextContract) {
    auth.logout()

    response.redirect().toRoute('home')
  }
}
