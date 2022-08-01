import { useRouter } from 'next/router';
import { FC } from 'react';

import Loading from '@/components/Loading';

import useGetUser from '@/hooks/useGetUser';

interface IProps {
  userData: any;
}

const UserPageView: FC<IProps> = ({ userData }) => {
  const { displayName, userName, bio, pfpUrl } = userData;

  return (
    <div className="flex flex-col">
      <div className="absolute">
        <div className="p-4 shadow rounded-t bg-blue-100 h-36 flex flex-col space-y-2 w-full md:w-[36rem]"></div>
        <div className="pt-10 pb-4 px-8 shadow rounded-b bg-white flex min-h-fit flex-col w-full md:w-[36rem]">
          <h3 className="font-bold text-xl">{displayName}</h3>
          <span className="text-gray-400">@{userName}</span>
          <p className="mt-2">{bio}</p>
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-100 absolute top-24 left-8">
          {pfpUrl && (
            <img
              src={pfpUrl}
              className="w-20 h-20 rounded-full"
              alt={`Foto de perfil de ${userName}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPageView;
