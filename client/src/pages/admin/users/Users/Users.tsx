import React from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Loader } from '../../../../components/Loader/Loader'
import { Toasts } from '../../../../components/Toasts/Toasts'
import { Button } from '../../../../components/Button/Button'
import { MainLayout } from '../../../../layout/MainLayout'
import { User } from '../../../../types/users'
import classes from '../users.module.scss'

export const UsersPage = () => {
    const history = useHistory()
    const users: User[] = []
    const loading = false

    const addHandler = () => {
        history.push('/admin/users/add')
    }

    const deleteUser = async (event: React.MouseEvent<HTMLDivElement>) => {
        const { id } = (event.target as HTMLDivElement).dataset
        console.log(id)
    }

    const updateUser = (event: React.MouseEvent<HTMLDivElement>) => {
        const { id } = (event.target as HTMLDivElement).dataset
        history.push(`/admin/users/edit/${id}`)
    }

    return (
        <MainLayout>
            {/* {success.length > 0 && <Toasts type={'success'} message={success} />}
            {error.length > 0 && <Toasts type={'error'} message={error} />} */}
            <h1 className={classes.title}>Пользователи</h1>

            <Button
                text={'Создать пользователя'}
                type="primary"
                icon={faPlus}
                onClick={addHandler}
            />
            {loading ? (
                <div className={classes.loader}>
                    <Loader size="md" />
                </div>
            ) : (
                <>
                    {users &&
                        users.map((user: User) => {
                            return (
                                <div key={user.id} className={classes.itemList}>
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
                                    <div
                                        onClick={updateUser}
                                        data-id={user.id}
                                        className={[classes.icon, classes.editIcon].join(' ')}
                                    >
                                        <FontAwesomeIcon
                                            className={classes.deleteIcon}
                                            icon={faEdit}
                                        />
                                    </div>
                                    <div
                                        onClick={deleteUser}
                                        data-id={user.id}
                                        className={[classes.icon, classes.trashIcon].join(' ')}
                                    >
                                        <FontAwesomeIcon
                                            className={classes.deleteIcon}
                                            icon={faTrashAlt}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                </>
            )}
        </MainLayout>
    )
}
