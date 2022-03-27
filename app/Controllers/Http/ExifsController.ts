// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import {DateTime} from 'luxon'
import File from 'App/Models/File'
import axios from 'axios'

export default class ExifsController {
    async index({ request, response }){
        // console.log(request)
        const filedata = request.file('file');
        await Database
            // .query()
            .from("services")
            .where("service_name", "exif")
            .increment("service_all_usage", 1)
            .update({service_last_usage: DateTime.local().toSQLDate()})
            // console.log(a)
            
        // console.log(filedata);
        try {
          if (!filedata) {
            response.send("Ошибка при загрузке файла");
          } else {
              await filedata.move(Application.tmpPath('uploads'),{
                  name: (Math.random().toString().slice(2)) + filedata.clientName.replace(/[а-яА-Я ]/g, ""),
              })
              const file = new File
              file.fill({
                  fieldName: filedata.clientName,
                  fileName: filedata.fileName,
                  size: filedata.size,
                  filePath: filedata.filePath,
                  type: filedata.type,
              })
              file.save()
              console.log(filedata.filePath)
              var data = await axios.post('http://127.0.0.1:53083/exif', {
                body: filedata.filePath,
                fileName: filedata.fileName,
              }).then(result => response.send(JSON.parse((result.data + "").replace(/'(.+?)'/g, '"$1"').replace(/(\d+?): /g, '"a$1": ').replace(/\(([0-9., ]+)\)/g, '[$1]').replace(/: b' ', /g, ': "aaaaaaaaaaa", ').replace(/b".+?"/g, '"no Data"'))));
          }
        }
        catch (e) {
          // console.log(e)
        }
      }
}
