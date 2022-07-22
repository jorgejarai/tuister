import { ChangeEvent, useState } from 'react';

interface IProps {
  onChange: (content: string) => void;
}

const POST_LENGTH = 140;

const getRemainingLengthColor = (remaining: number) => {
  const percentage = (remaining / POST_LENGTH) * 100;

  if (percentage > 50) {
    return '';
  } else if (percentage <= 50 && percentage > 25) {
    return 'text-yellow-500';
  } else {
    return 'text-red-600';
  }
};

const PostInput = ({ onChange }: IProps) => {
  const [content, setContent] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (value.length > POST_LENGTH) {
      return;
    }

    setContent(value);
    onChange(value);
  };

  const remainingLength = POST_LENGTH - content.length;
  const remainingLengthColor = getRemainingLengthColor(remainingLength);

  return (
    <div className="relative w-full">
      <textarea
        value={content}
        onChange={handleChange}
        className="resize-none bg-white p-4 rounded-md focus:ring focus:ring-blue-700 transition-all w-full h-36 focus:outline-none shadow"
      ></textarea>
      <span
        className={`absolute bottom-2 right-4 select-none ${remainingLengthColor}`}
      >
        {remainingLength}
      </span>
    </div>
  );
};

export default PostInput;
