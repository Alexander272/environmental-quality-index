import { Field, InputType } from '@nestjs/graphql'
// import { Length, IsEmail } from 'class-validator'

@InputType()
export class NewUserInput {
    @Field()
    // @Length(2, 30)
    name: string

    @Field()
    // @IsEmail()
    email: string

    @Field()
    // @Length(6, 30)
    password: string

    @Field()
    role: string

    @Field(type => [String])
    access?: string[]
}
