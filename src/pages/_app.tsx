import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <main className="w-screen h-screen">
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}

export default MyApp;
