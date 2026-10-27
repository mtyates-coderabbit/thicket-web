import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_API_URL ?? '/graphql' }),
  cache: new InMemoryCache(),
});

/** The demo storefront runs as a single signed-in customer. */
export const SESSION = {
  customerId: 'cus_avery',
  cartId: 'cart_avery',
  email: 'avery@example.com',
};
