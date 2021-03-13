import { gql } from '@apollo/client'

export default gql`
    query GetEmployes {
        getEmployes {
            id
            name
        }
    }
`
