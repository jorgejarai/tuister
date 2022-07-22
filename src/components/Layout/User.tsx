import { useUser } from '@auth0/nextjs-auth0';

const User = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="w-10 h-10 rounded-full bg-gray-100">
      {user.picture && <img src={user.picture} alt="Mi foto de perfil" />}
    </div>
  );
};

export default User;
