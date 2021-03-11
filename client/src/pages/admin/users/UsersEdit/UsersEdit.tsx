import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { faAngleDown, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/client'
import { Button } from '../../../../components/Button/Button'
import { Input } from '../../../../components/Input/Input'
import { Toasts } from '../../../../components/Toasts/Toasts'
import { Loader } from '../../../../components/Loader/Loader'
import { MainLayout } from '../../../../layout/MainLayout'
import { userSelectRole } from '../../../../store/users/userSlice'
import createUser from '../../../../graphql/users/createUser'
import classes from '../users.module.scss'

export const UserAddPage = () => {
    const role = useSelector(userSelectRole)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [create] = useMutation(createUser)
    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
    })
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

    const createHandler = async () => {
        try {
            setLoading(true)
            const res = await create({
                variables: { newUserInput: form },
            })
            setLoading(false)
            setSuccess(res.data.createUser)
            setForm({
                name: '',
                email: '',
                password: '',
                role: 'employee',
            })
        } catch (error) {
            setLoading(false)
            setError('Данные не корректны')
        }
    }

    return (
        <MainLayout>
            <h1 className={classes.title}>Добавить пользователя</h1>
            <div className={classes.form}>
                {success && <Toasts type={'success'} message={success} />}
                {error && <Toasts type={'error'} message={error} />}
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
