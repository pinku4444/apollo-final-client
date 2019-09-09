import { HttpLink } from 'apollo-link-http';
import configuration from '../config/configuration';
import {setContext} from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const uri = configuration.serviceUrl;
const subsUri = configuration.graphqlServiceUrl;
const httpLink = new HttpLink({ uri });

const wsLink = new WebSocketLink({
  uri: subsUri,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('authToken')
        ? localStorage.getItem('authToken')
        : '',
    },
  },
});


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );



  export  default link;
