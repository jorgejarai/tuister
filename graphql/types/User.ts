import { extendType, nonNull, objectType, stringArg } from 'nexus';

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
    t.field('userByUserName', {
      type: 'User',
      args: {
        userName: nonNull(stringArg()),
      },
      resolve(_parent, { userName }, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            userName,
          },
        });
      },
    });
    t.field('userByEmail', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_parent, { email }, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            email,
          },
        });
      },
    });
  },
});
