import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { MdComment, MdMoreVert, MdThumbUpAlt } from 'react-icons/md';

import Loading from '@/components/Loading';

import useGetPost from '@/hooks/useGetPost';

import DateTooltip from './DateTooltip';

interface IProps {
  id: number;
}

const Post = ({ id }: IProps) => {
  const { data, loading, error } = useGetPost(id);

  if (loading) {
    return (
      <div className="p-4 shadow rounded bg-white flex flex-col space-y-2 w-full h-36 md:w-[36rem]">
        <Loading size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 shadow rounded bg-white flex items-center justify-center italic flex-col space-y-2 w-full h-36 md:w-[36rem]">
        No se pudo cargar el post.
      </div>
    );
  }

  return (
    <div className="p-4 shadow rounded bg-white flex flex-col space-y-2 w-full md:w-[36rem]">
      <div className="flex items-center">
        <Link href={`/user/${data.post.author.userName}`}>
          <a className="flex space-x-3 items-center cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-100">
              {data.post.author.pfpUrl && (
                <img
                  className="w-full h-full rounded-full"
                  src={data.post.author.pfpUrl}
                  alt={`Foto de perfil de ${data.post.author.displayName}`}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span>{data.post.author.displayName}</span>
              <span className="text-gray-500 text-sm">
                @{data.post.author.userName}
              </span>
            </div>
          </a>
        </Link>
        <div className="flex-grow" />
        <div className="self-start flex justify-end">
          <DateTooltip timestamp={data.post.createdAt.iso} />
        </div>
      </div>
      <p>{data.post.content}</p>
      <div className="flex text-gray-700 space-x-4 pt-2">
        <div className="text-2xl cursor-pointer hover:text-blue-500">
          <MdThumbUpAlt />
        </div>
        <div className="text-2xl cursor-pointer hover:text-blue-500">
          <MdComment />
        </div>
        <div className="flex-grow"></div>
        <div className="self-end text-2xl cursor-pointer hover:text-blue-500">
          <MdMoreVert />
        </div>
      </div>
    </div>
  );
};

export default Post;
