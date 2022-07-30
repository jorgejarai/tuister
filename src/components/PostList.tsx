import { FC } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Loading from '@/components/Loading';
import Post from '@/components/Post';

interface IProps {
  posts: any[];
  loading: boolean;
  hasNextPage: boolean;
  disabled: boolean;
  onLoadMore: () => void;
}

const PostList: FC<IProps> = ({
  posts,
  loading,
  hasNextPage,
  disabled,
  onLoadMore,
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    disabled,
  });

  return (
    <div className="flex my-4 items-center flex-grow flex-col">
      {posts.map(({ node }: any) => (
        <div className="py-1" key={node.id}>
          <Post id={node.id} />
        </div>
      ))}
      {(loading || hasNextPage) && (
        <div className="pb-4 flex-grow" ref={sentryRef}>
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
};

export default PostList;
