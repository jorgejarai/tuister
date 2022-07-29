import { gql, useQuery } from '@apollo/client';

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

const useGetPosts = (first: number) =>
  useQuery(GetPostsQuery, {
    variables: { first },
  });

export default useGetPosts;
