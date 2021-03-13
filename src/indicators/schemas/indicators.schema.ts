import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IndicatorDocument = Indicator & Document

@Schema()
export class Indicator {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    link: string

    @Prop({ required: false })
    values: number[]
}

export const IndicatorSchema = SchemaFactory.createForClass(Indicator)
