// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class FilesController {
    async index({response, request}){
        const page = request.input('count')
        const limit = 5
        const files = await Database.from('files').paginate(page, limit)
        console.log(files)



        return await response.status(200).json({
            success: true,
            data: files
        })
    }
}
