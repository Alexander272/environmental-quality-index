import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { usersSlice } from './users/userSlice'

export const store = configureStore({
    reducer: {
        user: usersSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
