import { Model } from 'mongoose'
import { Params } from '../dto/params.input'
import { IndicatorDocument } from '../schemas/indicators.schema'

export async function indicatorCalculation25(
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
                'Безопасность передвижения вблизи учреждений здравоохранения, образования, культуры и спорта (ед./кв. км)',
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

export async function indicatorCalculation26(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = (+params.par1 * +params.par2) / +params.par1 + +params.par2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Разнообразие культурно-досуговой и спортивной инфраструктуры (безразмерный коэффициент)',
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

export async function indicatorCalculation27(
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
            name: 'Обеспеченность спортивной инфраструктурой (%)',
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

export async function indicatorCalculation28(
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
                'Доля объектов культурного наследия, в которых размещаются объекты социально-досуговой инфраструктуры, в общем количестве объектов культурного наследия (%)',
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

export async function indicatorCalculation29(
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
                'Доля сервисов, способствующих повышению комфортности жизни маломобильных групп населения, в количестве таких сервисов, предусмотренных правовым актом Минстроя России (%)',
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

export async function indicatorCalculation30(
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
                'Доля детей в возрасте 1 - 6 лет, состоящих на учете для определения в дошкольные образовательные учреждения, в общей численности детей в возрасте 1 - 6 лет (%)',
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
