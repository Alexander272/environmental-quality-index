import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound/404'
import { HomePage } from './pages/Home/Home'
import { AuthPage } from './pages/Auth/Auth'

import { UsersPage } from './pages/admin/users/Users/Users'
import { UserAddPage } from './pages/admin/users/UsersAdd/UsersAdd'

export const useRoutes = (role: string | undefined) => {
    if (role)
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                {role === 'admin' && (
                    <>
                        <Route path="/admin/users" exact>
                            <UsersPage />
                        </Route>
                        <Route path="/admin/users/add" exact>
                            <UserAddPage />
                        </Route>
                        <Route path="/admin/users/edit/:id" exact>
                            <UsersPage />
                        </Route>
                    </>
                )}
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        )
    else
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        )
}
