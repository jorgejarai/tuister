import { gql, useQuery } from '@apollo/client';

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

const useGetPostsByUser = (userName: string, first: number) =>
  useQuery(GetPostsByUserQuery, {
    variables: { userName, first },
  });

export default useGetPostsByUser;
