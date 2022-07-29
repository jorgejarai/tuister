import { gql, useMutation } from '@apollo/client';

const CreatePostMutation = gql`
  mutation ($content: String!) {
    createPost(content: $content) {
      id
      content
      createdAt {
        iso
      }
      author {
        id
        displayName
        userName
      }
      likes {
        id
      }
    }
  }
`;

export type UseCreatePostTuple = [
  (content: string) => void,
  {
    success: boolean;
    loading: boolean;
    error: any;
  },
];

const useCreatePost = (): UseCreatePostTuple => {
  const [mutate, { data, loading, error }] = useMutation(CreatePostMutation);

  const createPost = (content: string) =>
    mutate({
      variables: {
        content,
      },
    });

  return [createPost, { loading, error, success: !!data }];
};

export default useCreatePost;
