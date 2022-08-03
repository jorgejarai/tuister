import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const GetPostsByUserQuery = gql`
  query ($first: Int!, $after: Int) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
`;

const useGetPostsByUser = (userName: string, first: number) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GetPostsByUserQuery,
    {
      variables: { userName, first },
    },
  );

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

  return {
    data,
    loading,
    error,
    fetchMore: loadMore,
    refetch: (userName: string, first: number) => refetch({ userName, first }),
    hasNextPage,
  };
};

export default useGetPostsByUser;
