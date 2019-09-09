import gql from 'graphql-tag';

const UPDATE_USER_SUBSCRIPTION = gql`
    subscription {
        updateUser{
            _id
            name
            email
        }
    }
`;


export {UPDATE_USER_SUBSCRIPTION};