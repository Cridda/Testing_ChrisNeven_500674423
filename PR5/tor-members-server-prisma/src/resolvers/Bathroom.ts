import { BathroomResolvers } from '../generated/graphqlgen';

export const Bathroom: BathroomResolvers.Type = {
    ...BathroomResolvers.defaultResolvers,

    name: ({ id }, args, ctx) => {
        return ctx.prisma.bathroom({ id }).name();
    },
    type: ({ id }, args, ctx) => {
        return ctx.prisma.bathroom({ id }).type();
    }
};
