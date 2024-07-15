import { makeVar, InMemoryCache } from '@apollo/client';
import { Keypair } from '@solana/web3.js';

export const balanceVar = makeVar(0);

export const publicKeyVar = makeVar('');

export const accountVar = makeVar<Keypair | null>(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        balance: {
          read() {
            return balanceVar();
          },
        },
        account: {
          read() {
            return accountVar();
          },
        },
        publicKey: {
          read() {
            return publicKeyVar();
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
