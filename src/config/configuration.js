import { config } from 'dotenv'
config();

const envVars = process.env;

const configuration = Object.freeze({
    serviceUrl: envVars.REACT_APP_APOLLO_GRAPHQL_URI,
    graphqlServiceUrl: envVars.REACT_APP_APOLLO_SUB_GRAPHQL_URI
});


export default configuration;