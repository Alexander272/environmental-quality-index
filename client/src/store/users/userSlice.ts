import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { LoginState } from '../../types/users'

type UserState = {
    loading: boolean
    error: null | string
    name: string
    avatar: undefined | string
}

const initialState: UserState = {
    loading: false,
    error: null,
    name: '',
    avatar: undefined,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: state => {
            state.loading = true
        },
        loginSuccess: (state, action: PayloadAction<{ name: string; avatar?: string }>) => {
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.loading = false
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const { loginStart, loginSuccess, loginFailure } = usersSlice.actions

export const login = ({ email, password }: LoginState): AppThunk => dispatch => {
    try {
        dispatch(loginStart())
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}

export const avtoLogin = (): AppThunk => dispatch => {
    const name = localStorage.getItem('name')
    const avatar = localStorage.getItem('avatar')
    if (name)
        dispatch(
            loginSuccess({
                name,
                avatar: avatar ? avatar : undefined,
            })
        )
}

export const userSelectName = (state: RootState) => state.user.name
export const userSelectAvatar = (state: RootState) => state.user.avatar
export const userSelectLoading = (state: RootState) => state.user.loading
export const userSelectError = (state: RootState) => state.user.error

export default usersSlice.reducer
