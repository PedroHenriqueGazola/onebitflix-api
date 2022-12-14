import { Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export const authController = {
    //POST /auth/register
    register: async(req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone} = req.body

        try {
            const userAlreadyExist = await userService.findByEmail(email)
            if(userAlreadyExist) {
                throw new Error('Esse email já existe')
            }
            const user = await userService.create({
                firstName,
                lastName,
                email,
                password,
                birth,
                phone,
                role: 'user'
            })
            return res.status(201).json(user)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json( {message: error.message} )
            }
        }

    },
    //POST /auth/login
    login: async(req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)
            if(!user) return res.status(404).json({ message: 'E-mail não registrado.' })
            user.checkPassword(password, (err, isSame) => {
                if(err) return res.status(400).json({ message: err.message })
                if(!isSame) return res.status(401).json({message: 'Senha incorreta.'})

                const payload = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName
                }
                const token = jwtService.signPayload(payload, '7d')

                return res.json({ authenticated: true, ...payload , token })
            })
        } catch (error) {   
            if(error instanceof Error) {
                return res.status(400).json( {message: error.message} )
            }
        }
    }

}