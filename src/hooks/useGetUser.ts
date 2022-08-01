import { gql, useQuery } from '@apollo/client';

const GetUserQuery = gql`
  query ($userName: String!) {
    user(userName: $userName) {
      id
      userName
      displayName
      pfpUrl
      bio
    }
  }
`;

const useGetUser = (userName: string) =>
  useQuery(GetUserQuery, {
    variables: {
      userName,
    },
  });

export default useGetUser;
