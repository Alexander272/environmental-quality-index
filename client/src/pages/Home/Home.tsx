import React from 'react'
import { MainLayout } from '../../layout/MainLayout'
import classes from './home.module.scss'

export const HomePage = () => {
    const width = (188 / 360) * 100
    return (
        <MainLayout>
            <div className={classes.header}>
                <div className={classes.info}>
                    <h1 className={classes.cityName}>Екатеринбург</h1>
                    <p className={classes.regionName}>Свердловская область</p>
                    <div className={classes.description}>
                        <div className={classes.item}>
                            <p className={classes.itemTitle}>Категория</p>
                            <p className={classes.itemText}>Крупнейший город</p>
                        </div>
                        <div className={classes.item}>
                            <p className={classes.itemTitle}>Климат</p>
                            <p className={classes.itemText}>условно комфортный климат</p>
                        </div>
                        <div className={classes.item}>
                            <p className={classes.itemTitle}>Население</p>
                            <p className={classes.itemImage}>1&nbsp;483,1</p>
                            <p className={classes.itemText}>тыс. чел.</p>
                        </div>
                    </div>
                </div>
                <div className={classes.images}>
                    <img src="/images/Yekaterinburg.png" alt="Yekaterinburg" />
                </div>
            </div>
            <div className={[classes.resultLine, classes.green].join(' ')}>
                <div className={classes.result}>
                    {/* style={{ left: width + '%' }} */}
                    <p className={classes.resultTitle}>188</p>
                    <p className={classes.resultBalls}>баллов</p>
                </div>
                <p className={classes.borders}>
                    <span>0</span>
                    <span>360</span>
                </p>
                <div className={classes.lineContainer}>
                    <div style={{ width: width + '%' }} className={classes.line}></div>
                </div>
            </div>
        </MainLayout>
    )
}
