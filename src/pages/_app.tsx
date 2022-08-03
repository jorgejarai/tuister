import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import Head from 'next/head';

import Layout from '@/components/Layout';

import apolloClient from '@/lib/apollo';

import '@/styles/globals.css';

import AppPropsWithPageParams from '@/types/AppPropsWithPageParams';

function MyApp({ Component, pageProps }: AppPropsWithPageParams) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Layout>
          <Head>
            <title>{Component?.pageParams?.title || 'Tuister'}</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
