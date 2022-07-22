import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';

import apolloClient from '@/lib/apollo';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
