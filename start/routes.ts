/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/post/new', 'PostsController.create').as('posts.create')
  Route.post('/post/new', 'PostsController.store')
  
  Route.get('/post/:id/update', 'PostsController.showAndUpdate').as('posts.update')
  Route.get('post/:id/update/newCategory', 'PostsController.createCat').as('posts.createCat')
  Route.post('/post/:id/update', 'PostsController.update')
  Route.delete('/post/:id/update', 'PostsController.destroy')

  Route.get('/contact', 'ContactController.contact').as('contact')
  Route.post('/contact', 'ContactController.store')
  
}).middleware('auth')

Route.group(() => {
  Route.get('/', 'PostsController.index').as('home')

  Route.get('/post/:id', 'PostsController.show').as('posts.show')

  Route.get('/profile/:username', 'ProfilesController.show')
  Route.get('/profile/userNotFound', 'ProfilesController.error').as('userNotFound')
}).middleware('silentAuth')


Route.get('/login', 'SecurityController.login').as('login')
Route.post('/login', 'SecurityController.doLogin')

Route.get('/register', 'SecurityController.register').as('register')
Route.post('/register', 'SecurityController.doRegister')

Route.get('/disconnect', 'SecurityController.disconnect').as('disconnect')