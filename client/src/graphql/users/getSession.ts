import { gql } from '@apollo/client'

export default gql`
    query GetSession {
        getSession {
            id
            name
            email
            role
            token
            access
        }
    }
`
