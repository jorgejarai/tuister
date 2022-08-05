import ErrorMessage from '@/components/ErrorMessage';
import NewPostButton from '@/components/NewPostButton';
import PostList from '@/components/PostList';
import TrendList from '@/components/TrendsList';

import useGetPosts from '@/hooks/useGetPosts';

const HomePageView = () => {
  const { data, loading, error, fetchMore, hasNextPage } = useGetPosts(3);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="w-full h-full bg-blue-50 overflow-auto flex">
      <div className="my-5 mx-8 w-1/5"></div>
      <PostList
        posts={data?.posts.edges || []}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
        disabled={!!error}
      />
      <TrendList />
      <NewPostButton />
    </div>
  );
};

export default HomePageView;
