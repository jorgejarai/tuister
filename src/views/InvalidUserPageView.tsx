import { FC } from 'react';

interface IProps {
  type: 'error' | 'not_found';
}

const errorMessages = {
  error: 'No se pudo cargar el perfil',
  not_found: 'Usuario no encontrado',
};

const InvalidUserPage: FC<IProps> = ({ type }) => (
  <div className="flex flex-col">
    <div className="absolute">
      <div className="p-4 shadow rounded-t bg-blue-100 h-36 flex flex-col space-y-2 w-full md:w-[36rem]"></div>
      <div className="px-8 pt-10 pb-4 shadow rounded-b bg-white flex min-h-fit flex-col  w-full md:w-[36rem]">
        <h3 className="text-center mb-4 font-bold text-xl">
          {errorMessages[type] || 'Error'}
        </h3>
      </div>
    </div>
  </div>
);

export default InvalidUserPage;
