import { MdComment, MdMoreVert, MdThumbUpAlt } from 'react-icons/md';

interface IProps {
  id: string;
}

const Post = ({ id }: IProps) => {
  return (
    <div className="p-4 shadow rounded bg-white flex flex-col space-y-2 w-full md:w-[36rem]">
      <div className="flex items-center">
        <div className="flex space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-100" />
          <div className="flex flex-col">
            <span>John Doe</span>
            <span className="text-gray-500 text-sm">@doe.john86</span>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="self-start flex justify-end">
          <span className="text-sm self-start text-gray-500">14:53</span>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, ea nemo
        vitae quia dolorem labore quos fugit, odio veniam sunt deserunt illo
        error dolore, nisi earum at itaque repellendus eveniet.
      </p>
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
