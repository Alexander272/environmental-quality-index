import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MainLayout } from '../../layout/MainLayout'
import { userSelectAccess } from '../../store/users/userSlice'
import { IndicatorDataType } from '../../types/indicators'
import indicatorsData from '../../data/indicatorData.json'
import classes from './indicators.module.scss'

export const IndicatorsPage = () => {
    const history = useHistory()
    const access = useSelector(userSelectAccess)
    const [indicators, setIndicators] = useState<IndicatorDataType[]>([])

    useEffect(() => {
        if (access) {
            const newIndicators: IndicatorDataType[] = indicatorsData.indicators.filter(indicator =>
                access.includes(indicator.link)
            )
            setIndicators(newIndicators)
        }
    }, [access])

    const openHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const { link } = (event.target as HTMLDivElement).dataset
        link && history.push(`/indicators/${link}`)
    }

    return (
        <MainLayout>
            <h1 className={classes.title}>Показатели</h1>
            <div className={classes.list}>
                {indicators.map(indicator => (
                    <div
                        onClick={openHandler}
                        key={indicator.title}
                        className={classes.item}
                        data-link={indicator.link}
                    >
                        <p className={classes.itemTitle}>{indicator.title}</p>
                    </div>
                ))}
            </div>
        </MainLayout>
    )
}
