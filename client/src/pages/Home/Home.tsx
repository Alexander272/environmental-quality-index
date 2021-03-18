import React from 'react'
import { Link } from 'react-router-dom'
import { CircleBar } from '../../components/CircleBar/CircleBar'
import { LineBar } from '../../components/LineBar/LineBar'
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
            <LineBar
                value={188}
                width={width}
                left={0}
                right={360}
                type={width >= 90 ? 'green' : width <= 10 ? 'red' : ''}
            />

            <div className={classes.categories}>
                <div className={classes.categoriesItem}>
                    <CircleBar value={42 / 60} type={42 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <Link to={`/categories/${'indicator-1'}`} className={classes.categoriesTitle}>
                        Жилье и прилегающие пространства
                    </Link>
                </div>
                <div className={classes.categoriesItem}>
                    <CircleBar value={35 / 60} type={35 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <p className={classes.categoriesTitle}>Улично-дорожная сеть</p>
                </div>
                <div className={classes.categoriesItem}>
                    <CircleBar value={21 / 60} type={21 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <p className={classes.categoriesTitle}>Озелененные пространства</p>
                </div>
                <div className={classes.categoriesItem}>
                    <CircleBar value={27 / 60} type={27 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <p className={classes.categoriesTitle}>
                        Общественно-деловая инфраструктура и прилегающие пространства
                    </p>
                </div>
                <div className={classes.categoriesItem}>
                    <CircleBar value={29 / 60} type={29 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <p className={classes.categoriesTitle}>
                        Социально-досуговая инфраструктура и прилегающие пространства
                    </p>
                </div>
                <div className={classes.categoriesItem}>
                    <CircleBar value={34 / 60} type={34 >= 50 ? 'green' : 42 <= 10 ? 'red' : ''} />
                    <p className={classes.categoriesTitle}>Общегородское пространство</p>
                </div>
            </div>
        </MainLayout>
    )
}
