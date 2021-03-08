import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faUser, faChartBar } from '@fortawesome/free-solid-svg-icons'
import classes from './navbar.module.scss'

export const Navbar = () => {
    const role: string = 'admin'
    const history = useHistory()

    const LogoutHandler = async () => {
        // auth.logout()
        history.push('/')
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
