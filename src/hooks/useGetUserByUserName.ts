import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GetUserByUserNameQuery = gql`
  query ($userName: String!) {
    userByUserName(userName: $userName) {
      id
      userName
      displayName
      pfpUrl
      bio
    }
  }
`;

const useGetUserByUserName = (userName: string) =>
  useQuery(GetUserByUserNameQuery, {
    variables: {
      userName,
    },
  });

export const useLazyGetUserByUserName = () =>
  useLazyQuery(GetUserByUserNameQuery);

export default useGetUserByUserName;
