import { Model } from 'mongoose'
import { Params } from '../dto/params.input'
import { IndicatorDocument } from '../schemas/indicators.schema'

export async function indicatorCalculation19(
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
                'Доля освещенных частей улиц, проездов, набережных на конец года в общей протяженности улиц, проездов, набережны (%)',
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

export async function indicatorCalculation20(
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
            name: 'Разнообразие услуг в общественно-деловых районах города (%)',
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

export async function indicatorCalculation21(
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
                'Доля площади города, убираемая механизированным способом, в общей площади города (%)',
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

export async function indicatorCalculation22(
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
            name: 'Концентрация объектов культурного наследия (ед./га)',
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

export async function indicatorCalculation23(
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
            name: 'Уровень развития общественно-деловых районов города (ед./га)',
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

export async function indicatorCalculation24(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const res1 =
        ((+params.par2 + +params.par3 + +params.par4) /
            (+params.par5 + +params.par6 + +params.par7)) *
        100
    const res2 = (+params.par8 / +params.par9) * 100
    const result: number = +params.par1 / 10 + (res1 * 5) / 10 + (res2 * 4) / 10
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Уровень внешнего оформления городского пространства (%)',
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
