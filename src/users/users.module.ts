import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './schemas/user.schema'
import { UserResolver } from './users.resolvers'
import { UsersService } from './users.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserResolver, UsersService],
})
export class UsersModule {}
