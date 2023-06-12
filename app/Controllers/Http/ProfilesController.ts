import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfilesController {
    public async show({ auth, view, response, params }: HttpContextContract) {
        const userData = auth.user || false
        const userToDisplay = await User.findOrFail(params.username)

        if(!userToDisplay) {
            return response.redirect().toRoute('userNotFind')
        }

        return view.render('profile/show', {
            userData,
            userToDisplay
        })
        
    }

    public async error({ view, auth }: HttpContextContract) {
        const userData = auth.user || null

        return view.render('profile/user-not-found', {
            userData
        })
    }
}
