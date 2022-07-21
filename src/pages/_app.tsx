import type { AppProps } from 'next/app';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="w-screen h-screen">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
