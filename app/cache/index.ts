import { makeVar, InMemoryCache } from '@apollo/client';

export const balanceVar = makeVar(0);

export const pathNameVar = makeVar('');

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        balance: {
          read() {
            return balanceVar();
          },
        },
        pathName: {
          read() {
            return pathNameVar();
          },
        },
        nfts: {
          merge(_existing: any, incoming: any) {
            // Equivalent to what happens if there is no custom merge function.
            return incoming;
          },
        },
      },
    },
  },
});
