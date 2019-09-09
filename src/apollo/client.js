import { InMemoryCache } from 'apollo-cache-inmemory';
import link from './link';
import {ApolloClient} from 'apollo-client';


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        }
    }
});

export default client;