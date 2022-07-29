import { Context } from '@/graphql/context';

const getUserEmail = async ({ user, prisma }: Context) => {
  if (!user) {
    return null;
  }

  const result = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  return result?.id;
};

export default getUserEmail;
