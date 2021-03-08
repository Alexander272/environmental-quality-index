import { Field, InputType } from '@nestjs/graphql'
import { Length, IsEmail } from 'class-validator'

@InputType()
export class LoginInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    @Length(6, 30)
    password: string
}
