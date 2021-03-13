import React, { useEffect, useRef, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { MainLayout } from '../../../layout/MainLayout'
import { LinkList } from '../../../components/LinkList/LinkList'
import { Modal } from '../../../components/Modal/Modal'
import { Loader } from '../../../components/Loader/Loader'
import { Toasts } from '../../../components/Toasts/Toasts'
import indicators from '../../../data/indicatorData.json'
import getEmployes from '../../../graphql/users/getEmployes'
import classes from './indicators.module.scss'
import setAccess from '../../../graphql/users/setAccess'

export const IndicatorsPage = () => {
    const linkRef0 = useRef(null)
    const linkRef1 = useRef(null)
    const linkRef2 = useRef(null)
    const linkRef3 = useRef(null)
    const linkRef4 = useRef(null)
    const linkRef5 = useRef(null)
    const [users, setUsers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [setAc] = useMutation(setAccess)
    const [getUsers, { data }] = useLazyQuery(getEmployes)
    const [currentIndicator, setCurrentIndicator] = useState<string | null>(null)

    useEffect(() => {
        if (!data) {
            getUsers()
        }
        if (data) {
            setUsers(data.getEmployes)
        }
    }, [getUsers, data])

    const onToggleHandler = () => {
        setIsOpen(prev => !prev)
    }

    const clickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
        const { link } = (event.target as HTMLLIElement).dataset
        let current: any
        switch (link) {
            case '#indicator-1':
                current = linkRef0.current
                break
            case '#indicator-2':
                current = linkRef1.current
                break
            case '#indicator-3':
                current = linkRef2.current
                break
            case '#indicator-4':
                current = linkRef3.current
                break
            case '#indicator-5':
                current = linkRef4.current
                break
            case '#indicator-6':
                current = linkRef5.current
                break
        }
        if (current) {
            current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // current.scrollTop = current.scrollHeight
        }
    }

    const openHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const { link } = (event.target as HTMLDivElement).dataset
        link && setCurrentIndicator(link)
        onToggleHandler()
    }

    const selectUserHandler = async (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        try {
            onToggleHandler()
            setLoading(true)
            const res = await setAc({
                variables: { userId: id, indicator: currentIndicator },
            })
            setLoading(false)
            setSuccess(res.data.setAccess)
        } catch (error) {
            setLoading(false)
            setError('Что-то пошло не так')
        }
    }

    return (
        <MainLayout>
            <h1 className={classes.title}>Назначить показатели</h1>
            <Modal title="Выберите исполнителя" isOpen={isOpen} onToggle={onToggleHandler}>
                <div className={classes.userList}>
                    {users.map((user: { id: string; name: string }) => (
                        <p
                            className={classes.userItem}
                            key={user.id}
                            data-id={user.id}
                            onClick={selectUserHandler}
                        >
                            {user.name}
                        </p>
                    ))}
                </div>
            </Modal>
            <div className={classes.indicators}>
                {loading && (
                    <div className={classes.loader}>
                        <Loader size={'md'} />
                    </div>
                )}
                {success && <Toasts type={'success'} message={success} />}
                {error && <Toasts type={'error'} message={error} />}
                <LinkList
                    links={[
                        { link: '#indicator-1', title: 'Жилье и прилегающие пространства' },
                        { link: '#indicator-2', title: 'Улично-дорожная сеть' },
                        { link: '#indicator-3', title: 'Озелененные пространства' },
                        {
                            link: '#indicator-4',
                            title: 'Общественно-деловая инфраструктура и прилегающие пространства',
                        },
                        {
                            link: '#indicator-5',
                            title: 'Социально-досуговая инфраструктура и прилегающие пространства',
                        },
                        { link: '#indicator-6', title: 'Общегородское пространство' },
                    ]}
                    onClick={clickHandler}
                />
            </div>
            <div className={classes.list}>
                {indicators.indicators.map((indicator, index) => (
                    <React.Fragment key={indicator.link}>
                        {index % 6 === 0 && (
                            <div
                                id={`#indicator-${index / 6 + 1}`}
                                ref={
                                    index / 6 === 0
                                        ? linkRef0
                                        : index / 6 === 1
                                        ? linkRef1
                                        : index / 6 === 2
                                        ? linkRef2
                                        : index / 6 === 3
                                        ? linkRef3
                                        : index / 6 === 4
                                        ? linkRef4
                                        : linkRef5
                                }
                                className={classes.divider}
                            ></div>
                        )}
                        <div
                            onClick={openHandler}
                            className={classes.item}
                            data-link={indicator.link}
                        >
                            <p className={classes.itemTitle}>{indicator.title}</p>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </MainLayout>
    )
}
