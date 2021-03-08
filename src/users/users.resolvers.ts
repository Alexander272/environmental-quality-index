import { NotFoundException, Session } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { LoginInput } from './dto/login.input'
import { NewUserInput } from './dto/newUser.input'
// import { RecipesArgs } from './dto/recipes.args'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'

const pubSub = new PubSub()

@Resolver(of => UserModel)
export class UserResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(returns => UserModel)
    async getUser(@Args('id') id: string): Promise<UserModel> {
        const user = await this.usersService.findOneById(id)
        if (!user) {
            throw new NotFoundException(id)
        }
        return user
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
        console.log(context.req.session, 'context.req.session resolver')

        return await this.usersService.login(loginInput, context.req.session)
    }
}
