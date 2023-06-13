import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'
import { string } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

export default class PostsController {
  public async index({ view, request, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const posts = await Database.from(Post.table).paginate(page, 2)
    const userData = auth.user || null

    return view.render('posts/index', {
      posts,
      userData
    })
  }

  public async create({ view, auth }: HttpContextContract) {    
    const post = new Post()
    const categories = await Category.all()
    const userData = auth.user || null

    return view.render('posts/create', {
      post,
      categories,
      userData
    })
  }

  public async createCat({ response, request, session, params }: HttpContextContract) {
    const catName = request.input('category');

    console.log(catName);
    

    const cat = new Category()

    await cat.merge({
      name: catName
    }).save()

    response.redirect().toRoute('posts.update', { id: params.id })
    session.flash({ success: `La catégorie "${catName}" à été créé avec succès` })
  }

  public async store({ params, request, session, response, auth }: HttpContextContract) {
    await this.handleRequest(params, request, auth)

    session.flash({ success: "L'article a bien été créé" })

    return response.redirect().toRoute('home')
  }

  public async show({ view, params, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const userData = auth.user || null
    const categories = await Category.all()

    post.createdAt = DateTime.

    return view.render('posts/show', {
      post,
      categories,
      userData
    })
  }

  public async showAndUpdate({ view, params, bouncer, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const userData = auth.user || null
    await bouncer.authorize('editPost', post)
    const categories = await Category.all()

    return view.render('posts/update', {
      post,
      categories,
      userData
    })
  }

  public async update({ params, request, response, session, bouncer, auth }: HttpContextContract) {
    await this.handleRequest(params, request, auth, bouncer)

    session.flash({ success: "L'article a bien été sauvegarder" })

    return response.redirect().toRoute('home')
  }

  public async destroy({ params, session, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    session.flash({ success: "L'article a bien été supprimé" })

    return response.redirect().toRoute('home')
  }

  private async handleRequest(
    params: HttpContextContract['params'],
    request: HttpContextContract['request'],
    auth?: HttpContextContract['auth'],
    bouncer?: HttpContextContract['bouncer'],
  ) {
    const post = params.id ? await Post.findOrFail(params.id) : new Post()
    const data = await request.validate(UpdatePostValidator)
    const thumbnail = request.file('thumbnailFile')

    let authUserId

    if (bouncer) {
      await bouncer.authorize('editPost', post)
    }

    if (thumbnail) {
      if (post.thumbnail) {
        await Drive.delete(post.thumbnail)
      }

    if(auth) {
      authUserId = auth.user.id
    }

      const newName = `${string.generateRandom(32)}.${thumbnail.extname}`

      await thumbnail.moveToDisk('./', { name: newName })

      post.thumbnail = newName
    }    

    post
      .merge({
        title: data.title,
        categoryId: data.categoryId,
        content: data.content,
        online: data.online || false,
        userId: authUserId
      })
      .save()
  }
}

