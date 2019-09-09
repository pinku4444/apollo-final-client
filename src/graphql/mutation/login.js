import gql from 'graphql-tag'

const LOGIN_Mutation = gql`
    mutation LoginUser($email: String!,$password: String!) {
        loginUser(data:{email: $email,password: $password}) {
            token
        }
    }
`

export {LOGIN_Mutation}