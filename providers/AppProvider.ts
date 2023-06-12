import { Ioc } from '@adonisjs/fold'
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ContactService from 'App/Services/ContactService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('ContactService', (ioc: Ioc) => {
      
      return new ContactService('contact@frenchprime.fr', ioc.resolveBinding('Adonis/Addons/Mail'), ioc.resolveBinding('Adonis/Core/Validator'))
    })
    this.app.container.singleton('NoReplyContactService', (ioc: Ioc) => {
      return new ContactService('noreply@frenchprime.fr', ioc.resolveBinding('Adonis/Addons/Mail'), ioc.resolveBinding('Adonis/Core/Validator'))
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
