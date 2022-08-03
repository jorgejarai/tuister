import Head from 'next/head';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading';

import useGetUserByUserName from '@/hooks/useGetUserByUserName';

import type { PageWithParams } from '@/types/AppPropsWithPageParams';

import InvalidUserPage from '@/views/InvalidUserPageView';
import UserPageView from '@/views/UserPageView';

const UserPage: PageWithParams = () => {
  const router = useRouter();
  const { userName } = router.query as { [key: string]: string };

  const { data, loading, error } = useGetUserByUserName(userName);

  if (loading) {
    return (
      <div className="flex flex-col absolute">
        <div className="p-4 shadow rounded-t bg-blue-100 h-72 flex flex-col space-y-2 w-full md:w-[36rem]">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return <InvalidUserPage type="error" />;
  }

  if (!data?.userByUserName) {
    return <InvalidUserPage type="not_found" />;
  }

  return (
    <>
      <Head>
        <title>{data.userByUserName.displayName} - Tuister</title>
      </Head>
      <UserPageView userData={data.userByUserName} />
    </>
  );
};

export default UserPage;
