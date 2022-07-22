import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import type { NextPage } from 'next';
import Head from 'next/head';

import PostInput from '@/components/PostInput';

const NewPost: NextPage = () => {
  return (
    <div className="w-full h-full bg-blue-50">
      <Head>
        <title>Nuevo post - Tuister</title>
      </Head>
      <div className="flex flex-col p-4 space-y-4 items-center mx-24">
        <h1 className="text-3xl self-start font-bold">Nuevo post</h1>
        <div className="h-2" />
        <PostInput onChange={(content) => {}} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded text-md font-semibold px-2 py-1 self-end shadow focus:ring focus:ring-blue-700 transition-all focus:outline-none">
          Publicar
        </button>
      </div>
    </div>
  );
};

export default withPageAuthRequired(NewPost);
