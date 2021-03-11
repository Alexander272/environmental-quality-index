import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Loader } from '../../../../components/Loader/Loader'
import { Toasts } from '../../../../components/Toasts/Toasts'
import { Button } from '../../../../components/Button/Button'
import { MainLayout } from '../../../../layout/MainLayout'
import { User } from '../../../../types/users'
import getAllUser from '../../../../graphql/users/getAllUser'
import removeUser from '../../../../graphql/users/removeUser'
import classes from '../users.module.scss'

export const UsersPage = () => {
    const history = useHistory()
    const [remove] = useMutation(removeUser)
    const [users, setUsers] = useState<User[]>([])
    const [loadingDel, setLoadingDel] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [errorDel, setErrorDel] = useState<string | null>(null)
    const [getUsers, { loading, data }] = useLazyQuery(getAllUser, {
        fetchPolicy: 'network-only',
    })

    useEffect(() => {
        if (!data) getUsers()
        if (data && !users.length) {
            setUsers(data.getAllUsers)
        }
    }, [data, users, getUsers])

    const addHandler = () => {
        history.push('/admin/users/add')
    }

    const deleteUser = async (event: React.MouseEvent<HTMLDivElement>) => {
        const { id } = (event.target as HTMLDivElement).dataset
        try {
            setLoadingDel(true)
            const res = await remove({
                variables: { id },
            })
            console.log(res)
            setLoadingDel(false)
            setSuccess(res.data.removeUser)
            setUsers(prev => prev.filter(user => user.id !== id))
        } catch (error) {
            setLoadingDel(false)
            setErrorDel('Что-то пошло не так')
        }
    }

    const updateUser = (event: React.MouseEvent<HTMLDivElement>) => {
        const { id } = (event.target as HTMLDivElement).dataset
        history.push(`/admin/users/edit/${id}`)
    }

    return (
        <MainLayout>
            <h1 className={classes.title}>Пользователи</h1>

            <Button
                text={'Создать пользователя'}
                type="primary"
                icon={faPlus}
                onClick={addHandler}
            />
            <div className={classes.container}>
                {success && <Toasts type={'success'} message={success} />}
                {errorDel && <Toasts type={'error'} message={errorDel} />}
                {loading || loadingDel ? (
                    <div className={classes.loader}>
                        <Loader size="md" />
                    </div>
                ) : (
                    <>
                        {users &&
                            users.map((user: User) => {
                                return (
                                    <div key={user.id} className={classes.itemList}>
                                        <div className={classes.itemContainer}>
                                            <div>
                                                <p>Имя пользователя</p>
                                                <p className={classes.bold}>
                                                    <b>{user.name}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <p>email</p>
                                                <p className={classes.bold}>
                                                    <b>{user.email}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <p>Роль пользователя</p>
                                                <p className={classes.bold}>
                                                    <b>{user.role}</b>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={classes.btns}>
                                            <div
                                                onClick={updateUser}
                                                data-id={user.id}
                                                className={[classes.icon, classes.editIcon].join(
                                                    ' '
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    className={classes.deleteIcon}
                                                    icon={faEdit}
                                                />
                                            </div>
                                            <div
                                                onClick={deleteUser}
                                                data-id={user.id}
                                                className={[classes.icon, classes.trashIcon].join(
                                                    ' '
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    className={classes.deleteIcon}
                                                    icon={faTrashAlt}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </>
                )}
            </div>
        </MainLayout>
    )
}
