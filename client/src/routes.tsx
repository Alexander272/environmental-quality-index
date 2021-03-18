import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound/404'
import { HomePage } from './pages/Home/Home'
import { AuthPage } from './pages/Auth/Auth'

import { CategoriesPage } from './pages/Categories/Categories'
import { HistoryPage } from './pages/History/History'

import { IndicatorsPage } from './pages/Indicators/Indicators'
import { SetIndicatorPage } from './pages/SetIndicator/SetIndicator'

import { UsersPage } from './pages/admin/users/Users/Users'
import { UserAddPage } from './pages/admin/users/UsersAdd/UsersAdd'
import { UserEditPage } from './pages/admin/users/UsersEdit/UsersEdit'
import { IndicatorsPage as AdminIndicators } from './pages/admin/Indicators/Indicators'

export const useRoutes = (role: string | undefined) => {
    switch (role) {
        case 'admin':
            return (
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/admin/indicators" exact>
                        <AdminIndicators />
                    </Route>
                    <Route path="/admin/users" exact>
                        <UsersPage />
                    </Route>
                    <Route path="/admin/users/add" exact>
                        <UserAddPage />
                    </Route>
                    <Route path="/admin/users/edit/:id" exact>
                        <UserEditPage />
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
                    <Route path="/history/:id" exact>
                        <HistoryPage />
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
                    <Route path="/indicators" exact>
                        <IndicatorsPage />
                    </Route>
                    <Route path="/indicators/:indicator" exact>
                        <SetIndicatorPage />
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
