import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Params } from './dto/params.input'
import { Indicator, IndicatorDocument } from './schemas/indicators.schema'
import {
    indicatorCalculation1,
    indicatorCalculation2,
    indicatorCalculation3,
    indicatorCalculation4,
    indicatorCalculation5,
    indicatorCalculation6,
} from './indicatorCalculation/indicatorCalculation1-6'
import {
    indicatorCalculation7,
    indicatorCalculation8,
    indicatorCalculation9,
    indicatorCalculation10,
    indicatorCalculation11,
    indicatorCalculation12,
} from './indicatorCalculation/indicatorCalculation7-12'
import {
    indicatorCalculation13,
    indicatorCalculation14,
    indicatorCalculation15,
    indicatorCalculation16,
    indicatorCalculation17,
    indicatorCalculation18,
} from './indicatorCalculation/indicatorCalculation13-18'
import {
    indicatorCalculation19,
    indicatorCalculation20,
    indicatorCalculation21,
    indicatorCalculation22,
    indicatorCalculation23,
    indicatorCalculation24,
} from './indicatorCalculation/indicatorCalculation19-24'
import {
    indicatorCalculation25,
    indicatorCalculation26,
    indicatorCalculation27,
    indicatorCalculation28,
    indicatorCalculation29,
    indicatorCalculation30,
} from './indicatorCalculation/indicatorCalculation25-30'
import {
    indicatorCalculation31,
    indicatorCalculation32,
    indicatorCalculation33,
    indicatorCalculation34,
    indicatorCalculation35,
    indicatorCalculation36,
} from './indicatorCalculation/indicatorCalculation31-36'

@Injectable()
export class IndicatorsService {
    constructor(@InjectModel(Indicator.name) private indicatorModel: Model<IndicatorDocument>) {}

    async addValueIndicator(link: string, params: Params): Promise<number> {
        // let result: number
        const collection = {
            'indicator-1-1': indicatorCalculation1,
            'indicator-1-2': indicatorCalculation2,
            'indicator-1-3': indicatorCalculation3,
            // 'indicator-1-4': indicatorCalculation4,
            'indicator-1-5': indicatorCalculation5,
            'indicator-1-6': indicatorCalculation6,
            'indicator-2-1': indicatorCalculation7,
            'indicator-2-2': indicatorCalculation8,
            'indicator-2-3': indicatorCalculation9,
            'indicator-2-4': indicatorCalculation10,
            'indicator-2-5': indicatorCalculation11,
            'indicator-2-6': indicatorCalculation12,
            'indicator-3-1': indicatorCalculation13,
            'indicator-3-2': indicatorCalculation14,
            'indicator-3-3': indicatorCalculation15,
            'indicator-3-4': indicatorCalculation16,
            'indicator-3-5': indicatorCalculation17,
            'indicator-3-6': indicatorCalculation18,
            'indicator-4-1': indicatorCalculation19,
            'indicator-4-2': indicatorCalculation20,
            'indicator-4-3': indicatorCalculation21,
            'indicator-4-4': indicatorCalculation22,
            'indicator-4-5': indicatorCalculation23,
            'indicator-4-6': indicatorCalculation24,
            'indicator-5-1': indicatorCalculation25,
            'indicator-5-2': indicatorCalculation26,
            'indicator-5-3': indicatorCalculation27,
            'indicator-5-4': indicatorCalculation28,
            'indicator-5-5': indicatorCalculation29,
            'indicator-5-6': indicatorCalculation30,
            'indicator-6-1': indicatorCalculation31,
            'indicator-6-2': indicatorCalculation32,
            'indicator-6-3': indicatorCalculation33,
            'indicator-6-4': indicatorCalculation34,
            'indicator-6-5': indicatorCalculation35,
            'indicator-6-6': indicatorCalculation36,
        }
        const result = collection[link](link, params, this.indicatorModel)
        return result
    }
}
