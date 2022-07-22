import { FC } from 'react';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loading: FC<IProps> = ({ size = 'lg' }) => {
  let svgSize;

  switch (size) {
    case 'sm':
      svgSize = 30;
      break;
    case 'sm':
      svgSize = 50;
      break;
    case 'lg':
      svgSize = 100;
      break;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/loading.svg"
        width={svgSize}
        height={svgSize}
        className="animate-spin"
        alt="Cargando..."
      />
    </div>
  );
};

export default Loading;
