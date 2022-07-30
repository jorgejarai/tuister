import { gql, useQuery } from '@apollo/client';

const GetPostQuery = gql`
  query ($postId: Int!) {
    post(id: $postId) {
      id
      content
      createdAt {
        iso
      }
      author {
        id
        displayName
        userName
        pfpUrl
      }
      likes {
        id
      }
    }
  }
`;

const useGetPost = (postId: number) =>
  useQuery(GetPostQuery, {
    variables: {
      postId,
    },
  });

export default useGetPost;
