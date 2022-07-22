import { extendType, objectType } from 'nexus';

import { Post } from './Post';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('auth0Id');
    t.nonNull.string('userName');
    t.nonNull.string('email');
    t.nonNull.dateTime('birthDate', {});
    t.string('bio');
    t.nonNull.list.field('posts', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .posts();
      },
    });
    t.nonNull.list.nonNull.field('likes', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .likes();
      },
    });
  },
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
