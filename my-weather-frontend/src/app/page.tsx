"use client";

import { ApolloProvider } from '@apollo/client/react';
import client from './apolloClient';
import Home from './component/main-component/main';


export default function MyApp() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
