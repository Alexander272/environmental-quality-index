import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { LoginState, User } from '../../types/users'
import { useApollo } from '../../graphql/client'
import getUser from '../../graphql/users/getUser'
import getSession from '../../graphql/users/getSession'
import removeSession from '../../graphql/users/removeSession'

type UserState = {
    loading: boolean
    error: null | string
    id: string | null
    email: string | undefined
    name: string | undefined
    role: string | undefined
    token: string | null
    exp: number | undefined
}

const initialState: UserState = {
    loading: false,
    error: null,
    id: null,
    token: null,
    name: undefined,
    role: undefined,
    email: undefined,
    exp: undefined,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: state => {
            state.loading = true
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.name = action.payload.name
            state.role = action.payload.role
            state.id = action.payload.id
            state.email = action.payload.email
            state.token = action.payload.token
            state.exp = 6 * 60 * 60 * 1000 // 6 часов
            state.loading = false
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        logoutSuccess: state => {
            state.id = null
            state.name = undefined
            state.role = undefined
            state.token = null
            state.email = undefined
            state.exp = undefined
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = usersSlice.actions

export const login = ({ email, password }: LoginState): AppThunk => dispatch => {
    const client = useApollo(null)
    try {
        dispatch(loginStart())
        client
            .mutate({
                mutation: getUser,
                variables: { loginInput: { email, password } },
            })
            .then(res => {
                dispatch(loginSuccess(res.data.login))
            })
            .catch(e => console.log(e))
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}

export const avtoLogin = (): AppThunk => dispatch => {
    const client = useApollo(null)
    try {
        client
            .query({
                query: getSession,
            })
            .then(res => {
                dispatch(loginSuccess(res.data.getSession))
            })
            .catch(e => console.log(e.message))
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}

export const logout = (): AppThunk => dispatch => {
    const client = useApollo(null)
    try {
        client
            .mutate({
                mutation: removeSession,
            })
            .then(res => {
                dispatch(logoutSuccess())
            })
            .catch(e => console.log(e.message))
    } catch (error) {
        console.log(error)
    }
}

export const userSelectName = (state: RootState) => state.user.name
export const userSelectRole = (state: RootState) => state.user.role
export const userSelectEmail = (state: RootState) => state.user.email
export const userSelectUserID = (state: RootState) => state.user.id
export const userSelectToken = (state: RootState) => state.user.token
export const userSelectLoading = (state: RootState) => state.user.loading
export const userSelectError = (state: RootState) => state.user.error

export default usersSlice.reducer
