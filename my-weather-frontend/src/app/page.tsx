"use client";

import { ApolloProvider } from '@apollo/client/react';
import client from './apolloClient';
import Home from './component/main-component/main';
<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap');
</style>

export default function MyApp() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
