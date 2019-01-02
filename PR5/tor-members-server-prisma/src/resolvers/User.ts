import { UserResolvers } from '../generated/graphqlgen';

export const User: UserResolvers.Type = {
    ...UserResolvers.defaultResolvers,

    address: ({ id }, args, ctx) => {
        return ctx.prisma.user({ id }).address();
    },
    accommodations: ({ id }, args, ctx) => {
        return ctx.prisma.user({ id }).accommodations();
    }
};
