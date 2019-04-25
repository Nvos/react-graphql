import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import TodoDetails from './views/TodoDetails';
import TodoList from './views/TodoList';

const endpoint = 'localhost:8080/query';

// Create an http link:
const httpLink = new HttpLink({
  uri: `http://${endpoint}`,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${endpoint}`,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({});
const client = new ApolloClient({
  link,
  cache,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div style={{ height: '100vh' }}>
            <div
              style={{ display: 'flex', padding: 12, justifyContent: 'center' }}
            >
              <Link style={{ padding: 12 }} to="/list">
                Subscription
              </Link>
              <Link style={{ padding: 12 }} to="/details">
                Pooling
              </Link>
            </div>

            <div style={{ justifyContent: 'center', padding: 12 }}>
              <Route path="/list" component={TodoList} />
              <Route path="/details" component={TodoDetails} />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
