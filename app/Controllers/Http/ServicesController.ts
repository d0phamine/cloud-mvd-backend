// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from "App/Models/Service"

export default class ServicesController {
    async index({response}){
        // const services = [
        //     {
        //         serviceName: 'exif',
        //         serviceIp: 'http://127.0.0.1:5000',
        //         serviceData: '',
        //         serviceLastUsage: '',
        //         serviceAllUsage: '0',
        //     },
        //     {
        //         serviceName: 'textan',
        //         serviceIp: 'http://127.0.0.1:5001',
        //         serviceData: '',
        //         serviceLastUsage: '',
        //         serviceAllUsage: '0',
        //     }
        // ]
        // console.log(await Services.first())
        // console.log('1111')
        const services = await Service.all()
        
        const servicesJson = services.map((service) => service.toJSON())
        
        return await response.status(200).json({
            success: true,
            data: servicesJson
            // count: services.length,
            // data: services
        })
    }
}
