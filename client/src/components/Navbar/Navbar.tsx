import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { faHome, faSignOutAlt, faUser, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { logout, userSelectRole } from '../../store/users/userSlice'
import classes from './navbar.module.scss'

export const Navbar = () => {
    const dispatch = useDispatch()
    const role = useSelector(userSelectRole)

    const LogoutHandler = async () => {
        dispatch(logout())
    }

    return (
        <nav className={classes.nav}>
            <NavLink to="/" exact className={classes.link} activeClassName={classes.active}>
                <FontAwesomeIcon className={classes.icon} icon={faHome} />
                Главная
            </NavLink>

            {role === 'admin' && (
                <>
                    <NavLink
                        to="/admin/users"
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        <FontAwesomeIcon className={classes.icon} icon={faUser} />
                        Пользователи
                    </NavLink>
                    <NavLink
                        to="/admin/indicators"
                        className={classes.link}
                        activeClassName={classes.active}
                    >
                        <FontAwesomeIcon className={classes.icon} icon={faChartBar} />
                        Назначить показатели
                    </NavLink>
                </>
            )}

            {role === 'manager' && (
                <NavLink to="/users" className={classes.link} activeClassName={classes.active}>
                    <FontAwesomeIcon className={classes.icon} icon={faUser} />
                    Отвественные
                </NavLink>
            )}

            {role === 'employee' && (
                <NavLink to="/indicators" className={classes.link} activeClassName={classes.active}>
                    <FontAwesomeIcon className={classes.icon} icon={faChartBar} />
                    Показатели
                </NavLink>
            )}

            <p onClick={LogoutHandler} className={classes.link}>
                <FontAwesomeIcon className={classes.icon} icon={faSignOutAlt} />
                Выйти из системы
            </p>
        </nav>
    )
}
