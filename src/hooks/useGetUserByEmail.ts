import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GetUserByEmailQuery = gql`
  query ($email: String!) {
    userByEmail(email: $email) {
      id
      userName
      displayName
      pfpUrl
      bio
    }
  }
`;

const useGetUserByEmail = (email: string) =>
  useQuery(GetUserByEmailQuery, {
    variables: {
      email,
    },
  });

export const useLazyGetUserByEmail = () => useLazyQuery(GetUserByEmailQuery);

export default useGetUserByEmail;
