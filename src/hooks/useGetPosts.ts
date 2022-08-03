import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const GetPostsQuery = gql`
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

const useGetPosts = (first: number) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(GetPostsQuery, {
    variables: { first },
  });

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
    refetch: (first: number) => refetch({ first }),
    hasNextPage,
  };
};

export default useGetPosts;
