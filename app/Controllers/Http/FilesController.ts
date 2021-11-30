// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import File from 'App/Models/File'

export default class FilesController {
    async index({response}){
        const files = await File.all()
        console.log(files)



        return await response.status(200).json({
            success: true,
            data: files
        })
    }
}
