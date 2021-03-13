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

    async findOneById(_id: string): Promise<UserDocument> {
        return await this.userModel.findById(_id)
    }

    async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find().select('_id name email role')
    }

    async getEmployes(): Promise<UserDocument[]> {
        return await this.userModel.find({ role: 'employee' })
    }

    getSession(session: Record<string, any>) {
        if (session.userId)
            return {
                id: session.userId,
                token: session.token,
                name: session.name,
                email: session.email,
                role: session.role,
                access: session.access,
            }
        else return null
    }

    async removeUser(_id: string): Promise<string> {
        await this.userModel.findByIdAndDelete(_id)
        return 'Пользователь успешно удален'
    }

    async createUser(newUserInput: NewUserInput): Promise<string> {
        const { name, email, password, role } = newUserInput
        const candidate = await this.userModel.findOne({ email })
        if (candidate) throw new BadRequestException('Такой пользователь уже существует')
        const hasPass = await bcript.hash(password, 15)
        const user = new this.userModel({
            name,
            email,
            password: hasPass,
            role,
            access: null,
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
                    role: candidate.role,
                },
                config.get('sessionSecret'),
                { expiresIn: 6 * 60 * 60 }
            )
            session.token = token
            session.userId = candidate._id
            session.name = candidate.name
            session.role = candidate.role
            session.email = candidate.email
            session.access = candidate.access

            return {
                id: candidate.id,
                token: session.token,
                name: candidate.name,
                email: candidate.email,
                role: candidate.role,
                access: candidate.access,
            }
        } else throw new BadRequestException('Введенные данные некорректны')
    }

    async logout(session: Record<string, any>) {
        await session.destroy()
        return 'Успешно'
    }

    async updateUser(id: string, newUserInput: NewUserInput): Promise<string> {
        const candidate = await this.userModel.findById(id)
        const { name, email, password, role } = newUserInput
        if (password) {
            const hasPass = await bcript.hash(password, 15)
            candidate.password = hasPass
        }
        candidate.email = email
        candidate.name = name
        candidate.role = role
        await candidate.save()
        return 'Пользователь успешно обновлен'
    }

    async setAccess(userId: string, indicator: string): Promise<string> {
        await this.userModel.findByIdAndUpdate(userId, {
            $addToSet: { access: indicator },
        })
        return 'Показатель успешно назначен'
    }
}
