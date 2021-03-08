import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
    @Field(type => ID)
    id: string

    @Field()
    token: string

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    role: string
}
