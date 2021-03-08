import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader/Loader'
import { login, userSelectLoading } from '../../store/users/userSlice'
import classes from './auth.module.scss'

const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

type LoginState = {
    email: string
    password: string
}
type Valid = {
    name: string
    valid: boolean
}

export const AuthPage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(userSelectLoading)

    const [loginState, setLogin] = useState<LoginState>({
        email: '',
        password: '',
    })
    const [validErrors, setValidErrors] = useState({
        email: false,
        password: false,
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...loginState, [event.target.name]: event.target.value })
    }

    const validation = (state: LoginState) => {
        let name = '',
            valid = true
        if (state.password.trim().length < 6) {
            name = 'password'
            valid = false
        }
        if (!reg.test(state.email)) {
            name = 'email'
            valid = false
        }
        return { name, valid }
    }

    const loginHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        const { name, valid }: Valid = validation(loginState)
        setValidErrors({
            email: false,
            password: false,
        })
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                [name]: true,
            }))
        else {
            dispatch(login(loginState))
        }
    }

    return (
        <div className={[classes.container].join(' ')}>
            {loading && (
                <div className={classes.loader}>
                    <Loader size="md" />
                </div>
            )}
            <div className={classes.wrap}>
                <div className={classes.loginPic}>
                    <img src="/images/authImg.png" alt="auth-img" />
                </div>

                <form className={classes.form}>
                    <span className={classes.title}>Авторизация</span>

                    <div
                        className={[
                            classes.inputField,
                            classes.validate,
                            validErrors.email && classes.alertValidate,
                        ].join(' ')}
                        data-validate="Поле содержит не корректный email"
                    >
                        <input
                            className={classes.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginState.email}
                            onChange={changeHandler}
                        />
                        {validErrors.email && (
                            <span className={classes.alert}>
                                <FontAwesomeIcon className={classes.icon} icon={faExclamation} />
                            </span>
                        )}
                        <span className={classes.focusInput}></span>
                        <span className={classes.symbolInput}>
                            <FontAwesomeIcon className={classes.icon} icon={faEnvelope} />
                        </span>
                    </div>

                    <div
                        className={[
                            classes.inputField,
                            classes.validate,
                            validErrors.password && classes.alertValidate,
                        ].join(' ')}
                    >
                        <input
                            className={classes.input}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={loginState.password}
                            onChange={changeHandler}
                        />
                        {validErrors.password && (
                            <span
                                className={classes.alert}
                                data-validate="Пароль должен быть длинее 6 символов"
                            >
                                <FontAwesomeIcon className={classes.icon} icon={faExclamation} />
                            </span>
                        )}
                        <span className={classes.focusInput}></span>
                        <span className={classes.symbolInput}>
                            <FontAwesomeIcon className={classes.icon} icon={faLock} />
                        </span>
                    </div>

                    <div className={classes.btnContainer}>
                        <button onClick={loginHandler} className={classes.btn}>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
