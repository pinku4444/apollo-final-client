import gql from 'graphql-tag';

const GET_USER = gql`
    query {
        users {
            _id,
            name,
            email
        }
    }

`

export  { GET_USER} ;