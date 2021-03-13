import { gql } from '@apollo/client'

export default gql`
    mutation AddValueIndicator($link: String!, $params: Params!) {
        addValueIndicator(link: $link, params: $params)
    }
`
