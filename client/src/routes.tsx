import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound/404'
import { HomePage } from './pages/Home/Home'
import { AuthPage } from './pages/Auth/Auth'

import { CategoriesPage } from './pages/Categories/Categories'

import { UsersPage } from './pages/admin/users/Users/Users'
import { UserAddPage } from './pages/admin/users/UsersAdd/UsersAdd'

export const useRoutes = (role: string | undefined) => {
    switch (role) {
        case 'admin':
            return (
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/admin/users" exact>
                        <UsersPage />
                    </Route>
                    <Route path="/admin/users/add" exact>
                        <UserAddPage />
                    </Route>
                    <Route path="/admin/users/edit/:id" exact>
                        <UsersPage />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            )
        case 'manager':
            return (
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>

                    <Route path="/categories/:id" exact>
                        <CategoriesPage />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            )
        case 'employee':
            return (
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            )
        default:
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
}
