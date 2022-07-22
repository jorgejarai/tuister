import type { NextPage } from 'next';
import Head from 'next/head';

import NewPostButton from '@/components/NewPostButton';
import Post from '@/components/Post';

import withOptionalAuth from '@/hoc/withOptionalAuth';

const Home: NextPage = () => {
  return (
    <div className="w-full h-full bg-blue-50">
      <Head>
        <title>Tuister</title>
      </Head>
      <div className="flex flex-col p-4 space-y-4 items-center">
        <Post id="123" />
        <Post id="123" />
        <NewPostButton />
      </div>
    </div>
  );
};

export default withOptionalAuth(Home, '/api/auth/login');
