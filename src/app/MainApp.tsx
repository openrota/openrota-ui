import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// const defaultOptions: DefaultOptions = { query: { fetchPolicy: 'network-only' } };

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

export default function MainApp() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route>
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}