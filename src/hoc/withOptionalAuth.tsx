import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

import ErrorScreen from '@/components/ErrorScreen';
import Loading from '@/components/Loading';

const withOptionalAuth = (
  WrappedComponent: ComponentType,
  redirect: string,
) => {
  const OptionalAuth = () => {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorScreen />;
    }

    if (user) {
      return <WrappedComponent />;
    }

    router.push(redirect);

    return <Loading />;
  };

  OptionalAuth.displayName = 'OptionalAuth';

  return OptionalAuth;
};

export default withOptionalAuth;
