import { useRouter } from 'next/router';
import { MdModeEdit } from 'react-icons/md';

const NewPostButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/new');
  };

  return (
    <button
      className="absolute bottom-8 right-8 shadow-md rounded-full bg-blue-500 text-white text-2xl w-16 h-16 flex items-center justify-center hover:bg-blue-700 transition-all text-center"
      onClick={handleClick}
    >
      <MdModeEdit />
    </button>
  );
};

export default NewPostButton;
