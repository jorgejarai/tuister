import { extendType, intArg, nonNull, objectType } from 'nexus';

import { Post } from './Post';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('userName');
    t.string('displayName');
    t.nonNull.string('email');
    t.string('pfpUrl');
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
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, { id }, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});
