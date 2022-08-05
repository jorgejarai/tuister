import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';

import getUserEmail from '@/lib/getUserEmail';

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

export const PostEdge = objectType({
  name: 'PostEdge',
  definition(t) {
    t.int('cursor');
    t.field('node', {
      type: Post,
    });
  },
});

export const PostPageInfo = objectType({
  name: 'PostPageInfo',
  definition(t) {
    t.int('endCursor'), t.boolean('hasNextPage');
  },
});

export const PostResponse = objectType({
  name: 'PostResponse',
  definition(t) {
    t.field('pageInfo', { type: PostPageInfo });
    t.list.field('edges', {
      type: PostEdge,
    });
  },
});

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('posts', {
      type: 'PostResponse',
      args: {
        first: nonNull(intArg()),
        after: intArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;

        if (args.after) {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            orderBy: {
              createdAt: 'desc',
            },
          });
        }

        if (queryResults.length === 0) {
          return {
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
            },
            edges: [],
          };
        }

        const lastPostInResults = queryResults[queryResults.length - 1];
        const cursor = lastPostInResults.id;

        const secondQueryResults = await ctx.prisma.post.findMany({
          take: args.first,
          cursor: {
            id: cursor,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        return {
          pageInfo: {
            endCursor: cursor,
            hasNextPage: secondQueryResults.length >= args.first,
          },
          edges: queryResults.map((post) => ({
            cursor: post.id,
            node: post,
          })),
        };
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
    t.nonNull.field('postsByUser', {
      type: 'PostResponse',
      args: {
        userName: nonNull(stringArg()),
        first: nonNull(intArg()),
        after: intArg(),
      },
      async resolve(_parent, { userName, first, after }, ctx) {
        let queryResults = null;

        if (after) {
          queryResults = await ctx.prisma.post.findMany({
            where: {
              author: {
                userName,
              },
            },
            take: first,
            skip: 1,
            cursor: {
              id: after,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            where: {
              author: {
                userName,
              },
            },
            take: first,
            orderBy: {
              createdAt: 'desc',
            },
          });
        }

        if (queryResults.length === 0) {
          return {
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
            },
            edges: [],
          };
        }

        const lastPostInResults = queryResults[queryResults.length - 1];
        const cursor = lastPostInResults.id;

        const secondQueryResults = await ctx.prisma.post.findMany({
          take: first,
          cursor: {
            id: cursor,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        return {
          pageInfo: {
            endCursor: cursor,
            hasNextPage: secondQueryResults.length >= first,
          },
          edges: queryResults.map((post) => ({
            cursor: post.id,
            node: post,
          })),
        };
      },
    });
  },
});

export const PostsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        content: nonNull(stringArg()),
      },
      async resolve(_parent, { content }, ctx) {
        if (!ctx.user) {
          return null;
        }

        if (content.trim() === '') {
          throw new Error('El post no puede estar vacío.');
        }

        const authorId = await getUserEmail(ctx);

        const ret = ctx.prisma.post.create({
          data: {
            content: content.trim(),
            authorId: authorId!!,
            createdAt: new Date(),
          },
        });

        return ret;
      },
    });
  },
});
