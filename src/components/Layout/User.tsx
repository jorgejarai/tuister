import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { useEffect } from 'react';

import { useLazyGetUserByEmail } from '@/hooks/useGetUserByEmail';

const User = () => {
  const { user } = useUser();
  const [getUserName, { data, loading, error }] = useLazyGetUserByEmail();

  useEffect(() => {
    if (user && !loading && !error) {
      getUserName({ variables: { email: user.email! } });
    }
  }, [user, loading, error]);

  if (!user || !data || loading) {
    return null;
  }

  return (
    <Link href={`/user/${data.userByEmail.userName}`}>
      <a className="w-10 h-10 rounded-full bg-gray-100">
        {data?.userByEmail.pfpUrl && (
          <img
            src={data.userByEmail.pfpUrl}
            alt="Mi foto de perfil"
            className="rounded-full"
          />
        )}
      </a>
    </Link>
  );
};

export default User;
