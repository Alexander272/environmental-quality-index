import { gql } from '@apollo/client'

export default gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            id
            name
            email
            role
            token
        }
    }
`
