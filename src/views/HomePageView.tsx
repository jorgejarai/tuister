import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import NewPostButton from '@/components/NewPostButton';
import PostList from '@/components/PostList';

import useGetPosts from '@/hooks/useGetPosts';

const HomePageView = () => {
  const { data, loading, error, fetchMore } = useGetPosts(3);
  const [{ endCursor, hasNextPage }, setPageInfo] = useState<{
    endCursor: number | null;
    hasNextPage: boolean;
  }>({
    endCursor: null,
    hasNextPage: false,
  });

  useEffect(() => {
    if (data) {
      setPageInfo(data.posts.pageInfo);
    }
  }, [data]);

  const loadMore = () => {
    if (!endCursor) {
      return;
    }

    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.posts.edges = [
          ...prevResult.posts.edges,
          ...fetchMoreResult.posts.edges,
        ];
        return fetchMoreResult;
      },
    });
  };

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="w-full h-full bg-blue-50 overflow-auto flex-col flex">
      <PostList
        posts={data?.posts.edges || []}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        disabled={!!error}
      />
      <NewPostButton />
    </div>
  );
};

export default HomePageView;
