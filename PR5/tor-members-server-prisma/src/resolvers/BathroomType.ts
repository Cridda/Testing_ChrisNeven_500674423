import { BathroomTypeResolvers } from '../generated/graphqlgen';

export const BathroomType: BathroomTypeResolvers.Type = {
    ...BathroomTypeResolvers.defaultResolvers,

    name: ({ id }, args, ctx) => {
        return ctx.prisma.bathroomType({ id }).name();
    }
};
