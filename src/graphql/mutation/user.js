import gql from 'graphql-tag';

const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id:$id){
            _id,
            name,
            email
        }
    }

`

const UPDATE_USER = gql`
    mutation UpdateUser($id:ID!,$name:String!) {
        updateUser(id:$id,data:{name:$name}){
            _id,
            name,
            email
        }
    }

`

const ADD_USER = gql`
    mutation CreateUser($name:String!,$email:String!,$password: String!){
        createUser(data:{name:$name,email:$email,password:$password}) {
            token
        }
    }

`

export {
    DELETE_USER,
    UPDATE_USER,
    ADD_USER
}