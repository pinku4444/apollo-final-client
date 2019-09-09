import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard';
import {PrivateRoute} from './utils';
import client from './apollo';
import "./app.scss"
import { ApolloProvider} from 'react-apollo'

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </ApolloProvider>
        </Router>
    );
}

export default App;
