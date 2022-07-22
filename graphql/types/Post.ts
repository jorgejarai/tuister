import { extendType, intArg, nonNull, objectType } from 'nexus';

import { User } from './User';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('content');
    t.nonNull.dateTime('createdAt', {});
    t.nonNull.field('author', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .author();
      },
    });
    t.nonNull.list.nonNull.field('likes', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
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

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
    });
    t.nonNull.field('post', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: _args.id,
          },
        });
      },
    });
  },
});
