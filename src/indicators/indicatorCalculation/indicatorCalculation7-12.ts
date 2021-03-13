import { Model } from 'mongoose'
import { Params } from '../dto/params.input'
import { IndicatorDocument } from '../schemas/indicators.schema'

export async function indicatorCalculation7(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number =
        ((+params.par1 / +params.par2) * 100 + (+params.par3 / +params.par1) * 100) / 2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Доля погибших в дорожно-транспортных происшествиях (%)',
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

export async function indicatorCalculation8(
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
                'Доля общей протяженности улиц, обеспеченных ливневой канализацией (подземными водостоками), в общей протяженности улиц, проездов, набережных (%)',
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

export async function indicatorCalculation9(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const med = Object.values(params).sort((a: string, b: string) => +a - +b)
    const result: number = (med[1] + med[2]) / 2
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Загруженность дорог (безразмерный коэффициент)',
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

export async function indicatorCalculation10(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = +params.par1
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Количество улиц с развитой сферой услуг (ед.)',
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

export async function indicatorCalculation11(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const result: number = +params.par1
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name: 'Индекс пешеходной доступности (безразмерный коэффициент)',
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

export async function indicatorCalculation12(
    link: string,
    params: Params,
    Model: Model<IndicatorDocument>
): Promise<number> {
    const res1 = (+params.par1 / +params.par2) * 100
    const res2 = (+params.par3 / +params.par4) * 100
    const res3 = (+params.par5 / +params.par6) * 100
    const res4 = (+params.par7 / +params.par8) * 100
    const result: number = (res1 + res2 + res3 + res4) / 4
    const indicator = await Model.findOne({
        link,
    })
    if (!indicator) {
        const newIndicator = new Model({
            name:
                'Уровень доступности городской среды для инвалидов и иных маломобильных групп населения (%)',
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
