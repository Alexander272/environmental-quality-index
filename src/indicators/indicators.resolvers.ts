import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { IndicatorModel } from './models/indicators.model'
import { IndicatorsService } from './indicators.service'
import { IndicatorDocument } from './schemas/indicators.schema'
import { Params } from './dto/params.input'

@Resolver(of => IndicatorModel)
export class IndicatorResolver {
    constructor(private readonly indicatorsService: IndicatorsService) {}

    @Mutation(returns => Number)
    async addValueIndicator(
        @Args('link') link: string,
        @Args('params') params: Params
    ): Promise<number> {
        return await this.indicatorsService.addValueIndicator(link, params)
    }
}
