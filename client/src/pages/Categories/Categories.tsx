import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import { LineBar } from '../../components/LineBar/LineBar'
import { MainLayout } from '../../layout/MainLayout'
import classes from './categories.module.scss'

export const CategoriesPage = () => {
    const id = useParams<{ id: string }>().id

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <MainLayout>
            <div className={classes.header}>
                <h1 className={classes.title}>categories</h1>
                <Breadcrumbs
                    links={[
                        { link: '/', text: 'Главная' },
                        { link: `/categories/${id}`, text: 'categories' },
                    ]}
                />
            </div>
            <div className={classes.list}>
                <div className={classes.item}>
                    <LineBar
                        value={30}
                        width={50}
                        left={0}
                        right={60}
                        type={30 >= 90 ? 'green' : 30 <= 10 ? 'red' : ''}
                    />
                    <Link className={classes.link} to={`/history/:id`}>
                        categories
                    </Link>
                </div>
            </div>
        </MainLayout>
    )
}
