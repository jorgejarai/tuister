import type { NextPage } from 'next';
import Head from 'next/head';

import Loading from '@/components/Loading';
import NewPostButton from '@/components/NewPostButton';
import Post from '@/components/Post';

import withOptionalAuth from '@/hoc/withOptionalAuth';

import useGetPosts from '@/hooks/useGetPosts';

const Home: NextPage = () => {
  const { data, loading, error } = useGetPosts();

  return (
    <div className="w-full h-full bg-blue-50">
      <Head>
        <title>Tuister</title>
      </Head>
      <div className="flex flex-col p-4 space-y-4 items-center">
        {loading && <Loading />}
        {error && (
          <p>
            Oops!
            <code>
              <pre>{error.message}</pre>
            </code>
          </p>
        )}
        {data && data.posts.map((post) => <Post key={post.id} id={post.id} />)}
        <NewPostButton />
      </div>
    </div>
  );
};

export default withOptionalAuth(Home, '/api/auth/login');
