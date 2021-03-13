import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class IndicatorModel {
    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    link: string

    @Field(type => [Number], { nullable: true })
    values?: number[]
}
