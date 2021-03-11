import { gql } from '@apollo/client'

export default gql`
    mutation CreateUser($newUserInput: NewUserInput!) {
        createUser(newUserInput: $newUserInput)
    }
`
