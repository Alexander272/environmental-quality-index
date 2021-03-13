import { Model } from 'mongoose'
import { Params } from '../dto/params.input'
import { IndicatorDocument } from '../schemas/indicators.schema'

export async function indicatorCalculation31(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = +params.par1 / +params.par2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Количество дорожно-транспортных происшествий по отношению к численности населения в город (безразмерный коэффициент)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}

export async function indicatorCalculation32(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = ((+params.par1 + +params.par2) / +params.par3) * 100
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Доступность остановок общественного транспорта (%)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}

export async function indicatorCalculation33(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = (+params.par1 / +params.par2) * 100
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Доля городского населения, обеспеченного качественной питьевой водой из систем централизованного водоснабжения, в общей численности городского населения (%)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}

export async function indicatorCalculation34(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = +params.par1 / +params.par2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Количество центров притяжения для населения (ед.)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}

export async function indicatorCalculation35(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = (+params.par1 / +params.par2) * 100
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Доля населения, работающего в непроизводственном секторе экономики, в общей численности работающего населения (%)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}

export async function indicatorCalculation36(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number =
        ((+params.par1 / +params.par2) * 100 + (+params.par3 / +params.par4) * 100) / 2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Доля граждан в возрасте 14 лет и старше, вовлеченных в принятие решений по вопросам городского развития, в общей численности городского населения в возрасте 14 лет и старше (%)',
            link,
            values: [result],
        })
        await newIndicator.save()
    } else {
        indicator.values.push(result)
        await indicator.save()
    }
    return result
}
