import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcript from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

import { User, UserDocument } from './schemas/user.schema'
import { UserModel } from './models/user.model'
import { NewUserInput } from './dto/newUser.input'
import { LoginInput } from './dto/login.input'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOneById(id: string): Promise<UserModel> {
        return {} as UserModel
    }

    async createUser(newUserInput: NewUserInput): Promise<string> {
        const { name, email, password } = newUserInput
        const candidate = await this.userModel.findOne({ email })
        if (candidate) throw new BadRequestException('Такой пользователь уже существует')
        const hasPass = await bcript.hash(password, 15)
        const user = new this.userModel({
            name,
            email,
            password: hasPass,
            role: 'User',
        })
        await user.save()
        return 'Пользователь успешно создан'
    }

    async login(loginInput: LoginInput, session: Record<string, any>): Promise<UserModel> {
        const { email, password } = loginInput
        const candidate = await this.userModel.findOne({ email })
        if (!candidate) throw new BadRequestException('Введенные данные некорректны')
        const areSame = await bcript.compare(password, candidate.password)
        if (areSame) {
            const token = jwt.sign(
                {
                    email,
                    userName: candidate.name,
                    userId: candidate._id,
                },
                config.get('sessionSecret'),
                { expiresIn: 6 * 60 * 60 }
            )
            console.log(token, 'token')
            console.log(session, 'session')
            session.token = token
            session.userId = candidate._id
            session.name = candidate.name

            return {
                id: candidate.id,
                token: session.token,
                name: candidate.name,
                email: candidate.email,
                role: candidate.role,
            }
        } else throw new BadRequestException('Введенные данные некорректны')
    }
}
