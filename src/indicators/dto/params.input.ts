import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class Params {
    @Field()
    par1: string

    @Field({ nullable: true })
    par2: string

    @Field({ nullable: true })
    par3: string
    @Field({ nullable: true })
    par4: string
    @Field({ nullable: true })
    par5: string
    @Field({ nullable: true })
    par6: string
    @Field({ nullable: true })
    par7: string
    @Field({ nullable: true })
    par8: string
    @Field({ nullable: true })
    par9: string
    @Field({ nullable: true })
    par10: string
    @Field({ nullable: true })
    par11: string
    @Field({ nullable: true })
    par12: string
    @Field({ nullable: true })
    par13: string
    @Field({ nullable: true })
    par14: string
}
