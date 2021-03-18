import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { LineBar } from '../../components/LineBar/LineBar'
import { MainLayout } from '../../layout/MainLayout'
import { IndicatorDataType } from '../../types/indicators'
import indicatorsData from '../../data/indicatorData.json'
import classes from './categories.module.scss'

export const CategoriesPage = () => {
    const id = useParams<{ id: string }>().id
    const [inicators, setInicators] = useState<IndicatorDataType[]>([])

    useEffect(() => {
        const newIndicators = indicatorsData.indicators.filter(i => i.link.includes(id))
        setInicators(newIndicators)
    }, [id])

    return (
        <MainLayout>
            <div className={classes.header}>
                <h1 className={classes.title}>Жилье и прилегающие пространства</h1>
                <Breadcrumbs
                    links={[
                        { link: '/', text: 'Главная' },
                        { link: `/categories/${id}`, text: 'Жилье и прилегающие пространства' },
                    ]}
                />
            </div>
            <div className={classes.list}>
                {inicators.map(indicator => {
                    const value = Math.floor(Math.random() * Math.floor(10))
                    return (
                        <div key={indicator.link} className={classes.item}>
                            <LineBar
                                value={value}
                                width={value * 10}
                                left={0}
                                right={10}
                                type={5 >= 8 ? 'green' : 5 <= 2 ? 'red' : ''}
                            />
                            <Link className={classes.link} to={`/history/${indicator.link}`}>
                                {indicator.title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </MainLayout>
    )
}
