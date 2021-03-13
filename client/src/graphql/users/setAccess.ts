import { gql } from '@apollo/client'

export default gql`
    mutation SetAccess($userId: String!, $indicator: String!) {
        setAccess(userId: $userId, indicator: $indicator)
    }
`
