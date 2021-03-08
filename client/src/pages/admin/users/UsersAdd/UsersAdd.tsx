import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { faAngleDown, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../../../components/Button/Button'
import { Input } from '../../../../components/Input/Input'
import { Toasts } from '../../../../components/Toasts/Toasts'
import { Loader } from '../../../../components/Loader/Loader'
import { MainLayout } from '../../../../layout/MainLayout'
import classes from '../users.module.scss'

export const UserAddPage = () => {
    // const role = useSelector(state => state.user.role)
    // const token = useSelector(state => state.user.token)
    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
    })
    const loading = false
    const variantRole = {
        employee: 'Сотрудник',
        manager: 'Руководитель',
        admin: 'Администратор',
    }

    // if (role !== 'admin' && role !== 'owner') return <ErrorLayout />

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const clickHandler = () => {
        setIsOpen(prev => !prev)
    }

    const changeRoleHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { textContent } = event.target as HTMLParagraphElement
        setIsOpen(false)
        let role = ''
        Object.values(variantRole).forEach((r, index) => {
            if (r === textContent) role = Object.keys(variantRole)[index]
        })
        setForm({ ...form, role })
    }

    const createHandler = async () => {}

    return (
        <MainLayout>
            {/* {success.length > 0 && <Toasts type={'success'} message={success} />}
            {error.length > 0 && <Toasts type={'error'} message={error} />} */}
            <h1 className={classes.title}>Добавить пользователя</h1>
            <div className={classes.form}>
                {loading ? (
                    <div className={classes.loader}>
                        <Loader size={'md'} />
                    </div>
                ) : (
                    <>
                        <Input
                            name={'name'}
                            type={'text'}
                            value={form.name}
                            placeholder={'ФИО'}
                            onChange={changeHandler}
                        />
                        <Input
                            name={'email'}
                            type={'email'}
                            value={form.email}
                            placeholder={'Email'}
                            onChange={changeHandler}
                        />
                        <Input
                            name={'password'}
                            type={'password'}
                            value={form.password}
                            placeholder={'Пароль'}
                            onChange={changeHandler}
                        />
                        <div className={classes.list}>
                            <p className={classes.listTitle}>Роль</p>
                            <p onClick={clickHandler} className={classes.currentItem}>
                                {
                                    Object.values(variantRole)[
                                        Object.keys(variantRole).findIndex(r => r === form.role)
                                    ]
                                }
                                <FontAwesomeIcon
                                    className={[
                                        classes.listIcon,
                                        isOpen ? classes.rotate : null,
                                    ].join(' ')}
                                    icon={faAngleDown}
                                />
                            </p>
                            <div
                                className={[
                                    classes.listVariable,
                                    !isOpen ? classes.hidden : null,
                                ].join(' ')}
                            >
                                {Object.values(variantRole).map(role => {
                                    return (
                                        <p
                                            key={role}
                                            onClick={changeRoleHandler}
                                            className={classes.item}
                                        >
                                            {role}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                        <Button
                            text={'Создать'}
                            type="primary"
                            icon={faSave}
                            onClick={createHandler}
                        />
                    </>
                )}
            </div>
        </MainLayout>
    )
}
