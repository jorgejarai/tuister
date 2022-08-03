import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import NewPostButton from '@/components/NewPostButton';
import PostList from '@/components/PostList';

import useGetPosts from '@/hooks/useGetPosts';

const HomePageView = () => {
  const { data, loading, error, fetchMore, hasNextPage } = useGetPosts(3);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="w-full h-full bg-blue-50 overflow-auto flex-col flex">
      <PostList
        posts={data?.posts.edges || []}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
        disabled={!!error}
      />
      <NewPostButton />
    </div>
  );
};

export default HomePageView;
