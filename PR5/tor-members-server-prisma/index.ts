import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './src/generated/prisma-client';
import { resolvers } from './src/resolvers';
import { permissions } from './src/permissions/index';

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: resolvers as any,
    middlewares: [permissions],
    context: request => {
        return {
            ...request,
            prisma
        };
    }
});
server.start(() => console.log('Server is running on http://localhost:4000'));
