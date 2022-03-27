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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'





Route.get('/', async () => {
  // var a = await Database
  return Database.from('users').select('*') 
})

Route.post('exif', 'ExifsController.index')

Route.post('textan', async ({ request, response }) => {
  let textan = request.body();
  // console.log(textan)
  try {
    if (!textan) {
      response.send("Error text")
    } else {
      var textToAnalyse = await axios.post('http://127.0.0.1:59478/textan', {
        body: textan,
      }).then(result => response.send(result.data))
    }
  }
  catch (e) {
    // console.log(e)
  }
})



Route.group(() => {
  // Route.post('exifPhotoUpload', 'ServiceRequests/ServiceRequestsController.exifPhotoUpload')
  Route.post('storage', 'FilesController.index')
  Route.get('services', 'ServicesController.index')
  // Route.get('services', async() => {
  //   return Database
  //     .from("services")
  //     .select("*")
  // })
  Route.post('login', 'AuthenticationController.login')
  Route.post('register', 'AuthenticationController.register')
  Route.get('me', 'AuthenticationController.me').middleware(['auth'])
}).prefix('api')
