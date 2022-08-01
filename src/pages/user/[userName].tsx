import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading';

import useGetUser from '@/hooks/useGetUser';

import InvalidUserPage from '@/views/InvalidUserPageView';
import UserPageView from '@/views/UserPageView';

const UserPage: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query;

  const { data, loading, error } = useGetUser(userName as string);

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="absolute">
          <div className="p-4 shadow rounded-t bg-blue-100 h-72 flex flex-col space-y-2 w-full md:w-[36rem]">
            <Loading size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <InvalidUserPage type="error" />;
  }

  if (!data.user) {
    return <InvalidUserPage type="not_found" />;
  }

  return <UserPageView userData={data.user} />;
};

export default UserPage;
