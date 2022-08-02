import { FC, useEffect, useState } from 'react';

import ErrorMessage from '@/components/ErrorMessage';
import PostList from '@/components/PostList';

import useGetPostsByUser from '@/hooks/useGetPostsByUser';

interface IProps {
  userData: any;
}

const UserPageView: FC<IProps> = ({ userData }) => {
  const { displayName, userName, bio, pfpUrl } = userData;

  const { data, loading, error, fetchMore } = useGetPostsByUser(userName, 3);
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
    <div className="w-full h-full bg-blue-50 overflow-auto flex-col flex items-center">
      <div className="relative mt-4">
        <div className="p-4 shadow rounded-t bg-blue-100 h-36 flex flex-col space-y-2 w-full md:w-[36rem]"></div>
        <div className="pt-10 pb-4 px-8 shadow rounded-b bg-white flex min-h-fit flex-col w-full md:w-[36rem]">
          <h3 className="font-bold text-xl">{displayName}</h3>
          <span className="text-gray-400">@{userName}</span>
          <p className="mt-2">{bio}</p>
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-100 absolute top-24 left-8">
          {pfpUrl && (
            <img
              src={pfpUrl}
              className="w-20 h-20 rounded-full"
              alt={`Foto de perfil de ${userName}`}
            />
          )}
        </div>
      </div>
      <PostList
        posts={data?.posts.edges || []}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        disabled={!!error}
      />
    </div>
  );
};

export default UserPageView;
