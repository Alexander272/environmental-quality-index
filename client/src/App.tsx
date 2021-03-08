import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './graphql/clinet'
import { useRoutes } from './routes'

function App() {
    const routes = useRoutes('admin')
    const client = useApollo(null)

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div className="wrapper">{routes}</div>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
