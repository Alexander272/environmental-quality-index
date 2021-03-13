import { Model } from 'mongoose'
import { Params } from '../dto/params.input'
import { IndicatorDocument } from '../schemas/indicators.schema'

export async function indicatorCalculation1(
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
                'Доля площади многоквартирных домов, признанных аварийными, в общей площади многоквартирных домов (%)',
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

export async function indicatorCalculation2(
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
                'Доля площади жилых помещений, оборудованных одновременно водопроводом, водоотведением (канализацией), отоплением, горячим водоснабжением, газом или напольными электрическими плитами, в общей площади жилых помещений (%)',
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

export async function indicatorCalculation3(
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
                'Доля твердых коммунальных отходов, направленных на обработку и утилизацию, в общем объеме образованных и вывезенных твердых коммунальных отходов (%)',
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

export async function indicatorCalculation4(
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
            name: 'Разнообразие жилой застройки (безразмерный коэффициент)',
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

export async function indicatorCalculation5(
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
            name: 'Разнообразие услуг в жилой зоне (%)',
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

export async function indicatorCalculation6(
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
                'Доля многоквартирных домов, расположенных на земельных участках, в отношении которых осуществлен государственный кадастровый учет, в общем количестве многоквартирных домов (%)',
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
