import { FC } from 'react';

interface IProps {
  message: string;
}
const ErrorMessage: FC<IProps> = ({ message }) => (
  <div className="w-full h-full bg-blue-50 p-4 flex flex-col items-center justify-center space-y-2">
    <h1 className="text-4xl font-bold">Chale! 😢</h1>
    <h2 className="text-2xl">Hubo un error al cargar la página</h2>
    <p className="text-center">{message}</p>
  </div>
);

export default ErrorMessage;
