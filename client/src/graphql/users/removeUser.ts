import { gql } from '@apollo/client'

export default gql`
    mutation RemoveUser($id: String!) {
        removeUser(id: $id)
    }
`
