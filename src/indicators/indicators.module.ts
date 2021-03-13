import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Indicator, IndicatorSchema } from './schemas/indicators.schema'
import { IndicatorResolver } from './indicators.resolvers'
import { IndicatorsService } from './indicators.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Indicator.name, schema: IndicatorSchema }])],
    providers: [IndicatorResolver, IndicatorsService],
})
export class IndicatorsModule {}
