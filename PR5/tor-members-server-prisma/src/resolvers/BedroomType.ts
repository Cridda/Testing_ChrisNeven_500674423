import { BedroomTypeResolvers } from '../generated/graphqlgen';

export const BedroomType: BedroomTypeResolvers.Type = {
    ...BedroomTypeResolvers.defaultResolvers,

    name: ({ id }, args, ctx) => {
        return ctx.prisma.bedroomType({ id }).name();
    }
};
