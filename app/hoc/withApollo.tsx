/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';
import { NextPage } from 'next';
import { ApolloClient, ApolloProvider, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { cache } from '../cache';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: any;

const isBrowser = typeof window !== 'undefined';

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: any) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// const httpLink = new HttpLink({
//   uri: !isBrowser ? process.env.BASE_URL : process.env.NEXT_PUBLIC_BASE_URL, // Server URL (must be absolute)
//   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//   headers: { 'Apollo-Require-Preflight': 'true' },
// });

function createApolloClient() {
  return new ApolloClient({
    // ssrMode: typeof window === 'undefined',
    cache,
    // link: from([errorLink, httpLink]),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

const withApollo = (Component: NextPage) => (pageProps: any) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default withApollo;
