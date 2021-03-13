import { NotFoundException } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { LoginInput } from './dto/login.input'
import { NewUserInput } from './dto/newUser.input'
import { UserModel } from './models/user.model'
import { UserDocument } from './schemas/user.schema'
import { UsersService } from './users.service'

@Resolver(of => UserModel)
export class UserResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(returns => UserModel)
    async getUser(@Args('id') id: string): Promise<UserDocument> {
        const user = await this.usersService.findOneById(id)
        if (!user) {
            throw new NotFoundException(id)
        }
        return user
    }

    @Query(returns => [UserModel])
    async getAllUsers(): Promise<UserDocument[]> {
        return await this.usersService.findAll()
    }

    @Query(returns => [UserModel])
    async getEmployes(): Promise<UserDocument[]> {
        return await this.usersService.getEmployes()
    }

    @Query(returns => UserModel)
    async getSession(@Context() context: any) {
        const session = this.usersService.getSession(context.req.session)
        if (session) return session
        else throw new NotFoundException()
    }

    @Mutation(returns => String)
    async logout(@Context() context: any) {
        return this.usersService.logout(context.req.session)
    }

    @Mutation(returns => String)
    async removeUser(@Args('id') id: string): Promise<string> {
        return await this.usersService.removeUser(id)
    }

    @Mutation(returns => String)
    async createUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<string> {
        return await this.usersService.createUser(newUserInput)
    }

    @Mutation(returns => UserModel)
    async login(
        @Args('loginInput') loginInput: LoginInput,
        @Context() context: any
    ): Promise<UserModel> {
        return await this.usersService.login(loginInput, context.req.session)
    }

    @Mutation(returns => String)
    async updateUser(
        @Args('id') id: string,
        @Args('newUserInput') newUserInput: NewUserInput
    ): Promise<string> {
        return await this.usersService.updateUser(id, newUserInput)
    }

    @Mutation(returns => String)
    async setAccess(
        @Args('userId') userId: string,
        @Args('indicator') indicator: string
    ): Promise<string> {
        return await this.usersService.setAccess(userId, indicator)
    }
}
