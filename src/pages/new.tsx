import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PostInput from '@/components/PostInput';

import useCreatePost from '@/hooks/useCreatePost';

import type { PageWithParams } from '@/types/AppPropsWithPageParams';

const NewPost: PageWithParams = () => {
  const [createPost, { success, loading, error }] = useCreatePost();
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push('/');
    }
  }, [success]);

  return (
    <div className="w-full h-full bg-blue-50">
      <Head>
        <title>Nuevo post - Tuister</title>
      </Head>
      <div className="w-full md:w-1/2 flex flex-col p-4 space-y-4 items-center mx-auto">
        <h1 className="text-3xl self-start font-bold">Nuevo post</h1>
        <div className="h-2" />
        {error && (
          <span className="text-center text-red-600">
            Hubo un error al publicar el post
          </span>
        )}
        <PostInput onChange={setContent} />
        <button
          onClick={() => createPost(content)}
          disabled={loading || content.trim() === ''}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded text-md font-semibold px-2 py-1 self-end shadow focus:ring focus:ring-blue-700 transition-all focus:outline-none disabled:bg-gray-400"
        >
          {loading ? 'Cargando...' : 'Publicar'}
        </button>

        <p className="text-sm">No olvides ser respetuosx con el resto!</p>
      </div>
    </div>
  );
};

NewPost.pageParams = {
  title: 'Nuevo post - Tuister',
};

export default withPageAuthRequired(NewPost);
