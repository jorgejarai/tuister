import type { NextPage } from 'next';
import Head from 'next/head';

import withOptionalAuth from '@/hoc/withOptionalAuth';

const Home: NextPage = () => {
  return (
    <div className="w-full h-full">
      <Head>
        <title>Tuister</title>
      </Head>
    </div>
  );
};

export default withOptionalAuth(Home, '/api/auth/login');
