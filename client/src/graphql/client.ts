import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const cache = new InMemoryCache()

export const useApollo = (token: string | null) => {
    const authorization = token ? `Bearer ${token}` : null
    const httpLink = {
        uri: 'http://localhost:3000/api/graphql',
        headers: {
            authorization,
        },
    }

    const client = new ApolloClient({
        cache: cache,
        link: new HttpLink(httpLink),
        queryDeduplication: false,
        connectToDevTools: true,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
        },
    })

    return client
}
