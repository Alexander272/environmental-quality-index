import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './graphql/client'
import { useRoutes } from './routes'
import { avtoLogin, userSelectRole, userSelectToken } from './store/users/userSlice'

function App() {
    const dispatch = useDispatch()
    const role = useSelector(userSelectRole)
    const token = useSelector(userSelectToken)
    const routes = useRoutes(role)
    const client = useApollo(token)

    useEffect(() => {
        dispatch(avtoLogin())
    }, [dispatch])

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div className="wrapper">{routes}</div>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
