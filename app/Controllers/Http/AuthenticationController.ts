// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthenticationController {
    async register({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password'])
        // console.log(userData)
        // console.log(auth)
        // console.log(response)
        try {
            const user = await User.create(userData)
            const token = await auth.use('api').generate(user)
            console.log('1111111')
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.'
            })
        }
    }

    async login({ request, auth, response }) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const token = await auth.use('api').attempt(email, password)

            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            console.log(error)
            response.status(400).json({
                status: 'error',
                message: 'Invalid email/password.'
            })
        }
    }

    async me({ auth, response }) {

        return response.json({
            status: 'success',
            data: auth.user.$attributes
        })
    }
}
