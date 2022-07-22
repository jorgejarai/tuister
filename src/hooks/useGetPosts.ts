import { gql, useQuery } from '@apollo/client';

const GetPostsQuery = gql`
  query {
    posts {
      id
    }
  }
`;

const useGetPosts = () => useQuery(GetPostsQuery);

export default useGetPosts;
