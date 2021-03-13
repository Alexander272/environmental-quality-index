import { gql } from '@apollo/client'

export default gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            name
            role
            email
        }
    }
`
