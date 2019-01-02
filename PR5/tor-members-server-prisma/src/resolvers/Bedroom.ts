import { BedroomResolvers } from '../generated/graphqlgen';

export const Bedroom: BedroomResolvers.Type = {
    ...BedroomResolvers.defaultResolvers,

    name: ({ id }, args, ctx) => {
        return ctx.prisma.bedroom({ id }).name();
    },
    type: ({ id }, args, ctx) => {
        return ctx.prisma.bedroom({ id }).type();
    }
};
