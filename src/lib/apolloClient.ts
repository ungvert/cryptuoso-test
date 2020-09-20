import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
}

export function useApollo() {
  const store = createApolloClient();
  return store;
}
