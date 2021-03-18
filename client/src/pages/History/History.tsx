import React from 'react'
import { Line } from 'react-chartjs-2'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { MainLayout } from '../../layout/MainLayout'
import classes from './history.module.scss'

const values = [5, 4.8, 4.7, 5, 5.2]

export const HistoryPage = () => {
    return (
        <MainLayout>
            <div className={classes.header}>
                <h1 className={classes.title}>Жилье и прилегающие пространства</h1>
                <Breadcrumbs
                    links={[
                        { link: '/', text: 'Главная' },
                        {
                            link: `/categories/indicator-1`,
                            text: 'Жилье и прилегающие пространства',
                        },
                        {
                            link: `/history/indicator-1-1`,
                            text:
                                'Доля площади многоквартирных домов, признанных аварийными, в общей площади многоквартирных домов (%)',
                        },
                    ]}
                />
            </div>
            <div className={classes.chart}>
                <Line
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May'],
                        datasets: [
                            {
                                label:
                                    'Доля площади многоквартирных домов, признанных аварийными, в общей площади многоквартирных домов (%)',
                                fill: false,
                                data: values,
                                borderColor: '#0066ff',
                            },
                        ],
                    }}
                />
            </div>
        </MainLayout>
    )
}
